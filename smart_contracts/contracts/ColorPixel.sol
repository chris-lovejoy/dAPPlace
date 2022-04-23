// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ColorPixel is Ownable {
    
    uint256 changeCounter; 
    uint256 changes; 

    uint8[100] _pixels;
    mapping(uint => uint8) public _pixelColor;
    mapping(uint => address) public _artist;

    modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  event PixelSet(uint256, uint8);
  event MintingTriggered(bool);

    
    function updatePixel(uint _location, uint8 _color) public callerIsUser {
        _pixels[_location] = _color;
        _pixelColor[_location] = _color;
        _artist[_location] = msg.sender;

        changeCounter += 1; 

        emit PixelSet(_location, _color);
    }

    function getPixel(uint _location) public view returns(uint pixelColorByLocation, address artistAddress) {
        pixelColorByLocation = _pixelColor[_location];
        artistAddress =  _artist[_location]; 
    }

    function viewPixelsArray () public view returns (uint8[100] memory) {
        return _pixels;
    }

    function setChanges(uint256 _newChanges) public onlyOwner {
        changes = _newChanges;
    }

    function changeCounterTrigger() external returns(bool) {
        if (changeCounter % changes == 0){
            emit MintingTriggered(true);
            return true;
        } else
        return false;
    }


}