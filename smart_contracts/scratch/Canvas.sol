
pragma solidity ^0.8.0;

contract Canvas {

    modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

    uint8[100] _pixels;
    mapping(uint => string) public _pixelColor;
    mapping(uint => address) public _artist;

    function set (uint8 x, uint8 y, string memory color) public callerIsUser {
        uint8 i = (y * 10) + x;
        _pixels[i] = color;
    }

    function get (uint8 x, uint8 y) public view returns (uint8) {
        uint8 i = (y * 10) + x;
        return _pixels[i];
    }

    function pixels () public view returns (uint8[100] memory) {
        return _pixels;
    }
}