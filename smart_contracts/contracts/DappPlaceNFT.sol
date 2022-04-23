// SPDX-License-Identifier: GPL-3.0



pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./libraries/Base64.sol";

contract DapplaceNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;

    constructor() ERC721("DapplaceNFT", "DAP"){
      _tokenId.increment(); //Initializing NFT Id with != 0
    }

    modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  struct nftData {
    string colour;
    string imageURI;
    uint256 Xcoordinate;
    uint256 Ycoordinate;
  }

  mapping(uint256 => nftData) public tokenToData; 

  function mintNft(address mintedTo) public {
        uint256 currentTokenId = _tokenId.current();

        _safeMint(mintedTo, currentTokenId);

        tokenToData[currentTokenId] = nftData({
          colour: "#ddqwjkqdw",
          imageURI: "sjjw",
          Xcoordinate: 34,
          Ycoordinate: 34
        });

        _tokenId.increment();
    }
  function tokenId() view external returns(uint256){

    return _tokenId.current();
  }

}