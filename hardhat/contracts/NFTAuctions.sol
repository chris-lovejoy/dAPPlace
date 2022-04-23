// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import { Pausable } from '@openzeppelin/contracts/security/Pausable.sol';
import { ReentrancyGuard } from '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import "./DappPlaceNFT.sol";


contract dAPPplaceHouse is Pausable, ReentrancyGuard, Ownable {

    DapplaceNFT public nft;

    // The minimum price accepted in an auction
    uint256 public reservePrice;

    // The minimum percentage difference between the last bid amount and the current bid
    uint8 public minBidIncrementPercentage;

    //Projects wallet Address
    address public projectAddress = 0x93258FCaA2ff8D43821951e38aEfc273F700a9eF;

    // The active auction
    struct Auction {
        // ID for the Noun (ERC721 token ID)
        uint256 tokenId;
        // The current highest bid amount
        uint256 amount;
        // The address of the current highest bid
        address payable bidder;
        // Whether or not the auction has been settled
        bool settled;
    }

    Auction public auction;

    mapping(uint256 => Auction) public auctionById;

    event AuctionReservePriceUpdated(uint256);
    event AuctionMinBidIncrementPercentageUpdated(uint8);
    event AuctionCreated(uint256);
    event AuctionSettled(uint256, address, uint256);

    /**
     * @notice Initialize the auction house and base contracts,
     * populate configuration values, and pause the contract.
     * @dev This function can only be called once.
     */
    constructor(uint256 _reservePrice, uint8 _minBidIncrementPercentage){
        reservePrice = _reservePrice;
        minBidIncrementPercentage = _minBidIncrementPercentage;
    }

    /**
     * @notice Settle the current auction, mint a new Noun, and put it up for auction.
     */
    function settleCurrentAndCreateNewAuction() external nonReentrant whenNotPaused {
        _settleAuction();
        _createAuction();
    }

    /**
     * @notice Create a bid for a Place, with a given amount.
     * @dev This contract only accepts payment in ETH.
     */
    function createBid() external payable nonReentrant {
        uint256 currentTokenId = nft.tokenId();

        Auction memory _auction = auction;

        require(_auction.tokenId == currentTokenId, 'Place not up for auction');
        //require(block.timestamp < _auction.endTime, 'Auction expired');
        require(msg.value >= reservePrice, 'Must send at least reservePrice');
        require(
            msg.value >= _auction.amount + ((_auction.amount * minBidIncrementPercentage) / 100),
            'Must send more than last bid by minBidIncrementPercentage amount'
        );

        address payable lastBidder = _auction.bidder;

        // Refund the last bidder, if applicable
        if (lastBidder != address(0)) {
            _safeTransferETH(lastBidder, _auction.amount);
        }

        auction.amount = msg.value;
        auction.bidder = payable(msg.sender);

    }

    function getNextBidPrice() external view returns(uint256){
        Auction memory _auction = auction;
        if (auction.amount < reservePrice){
            return reservePrice;
        } else {
            return _auction.amount + ((_auction.amount * minBidIncrementPercentage) / 100);  
            }
        }

    /**
     * @notice Pause the auction house.
     * @dev This function can only be called by the owner when the
     * contract is unpaused. While no new auctions can be started when paused,
     * anyone can settle an ongoing auction.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause the auction house.
     * @dev This function can only be called by the owner when the
     * contract is paused. If required, this function will start a new auction.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Set the auction reserve price.
     * @dev Only callable by the owner.
     */
    function setReservePrice(uint256 _reservePrice) external onlyOwner {
        reservePrice = _reservePrice;

        emit AuctionReservePriceUpdated(_reservePrice);
    }

    /**
     * @notice Set the auction minimum bid increment percentage.
     * @dev Only callable by the owner.
     */
    function setMinBidIncrementPercentage(uint8 _minBidIncrementPercentage) external onlyOwner {
        minBidIncrementPercentage = _minBidIncrementPercentage;

        emit AuctionMinBidIncrementPercentageUpdated(_minBidIncrementPercentage);
    }

    /**
     * @notice Create an auction.
     * @dev Store the auction details in the `auction` state variable and emit an AuctionCreated event.
     * If the mint reverts, the minter was updated without pausing this contract first. To remedy this,
     * catch the revert and pause this contract.
     */
    function _createAuction() internal {

            uint256 currentTokenId = nft.tokenId();
            auction = Auction({
                tokenId: currentTokenId,
                amount: 0,
                bidder: payable(0),
                settled: false
            });

            emit AuctionCreated(currentTokenId);
    }

    /**
     * @notice Settle an auction, finalizing the bid and paying out to the owner.
     * @dev If there are no bids, the Noun is burned.
     */
    function _settleAuction() internal {
        
        Auction memory _auction = auction;
        require(!_auction.settled, 'Auction has already been settled');

        auction.settled = true;

        if (_auction.bidder == address(0)) {
            nft.mintNft(projectAddress);
        } else {
            nft.mintNft(_auction.bidder);
        }

        if (_auction.amount > 0) {
            _safeTransferETH(projectAddress, _auction.amount);
        }

        emit AuctionSettled(_auction.tokenId, _auction.bidder, _auction.amount);
    }

    /**
     * @notice Transfer ETH and return the success status.
     * @dev This function only forwards 30,000 gas to the callee.
     */
    function _safeTransferETH(address to, uint256 value) internal returns (bool) {
        (bool success, ) = to.call{ value: value, gas: 30_000 }(new bytes(0));
        return success;
    }

}
