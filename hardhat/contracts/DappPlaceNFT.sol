// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract DapplaceNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;

    string public ipfsUri; 

    constructor() ERC721("DapplaceNFT", "DAP"){
      _tokenId.increment(); //Initializing NFT Id with != 0
    }

    modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  event newUriSet(string); 

  function mintNft(address mintedTo) public {
        uint256 currentTokenId = _tokenId.current();

        _safeMint(mintedTo, currentTokenId);

        // Set the NFTs data.
        _setTokenURI(currentTokenId, ipfsUri);

        _tokenId.increment();
    }
  function setIpfsUri(string memory _newUri) external onlyOwner{
    ipfsUri = _newUri;
    emit newUriSet(_newUri);
  }

  function tokenId() public view returns(uint256){
    return _tokenId.current();
  }

}