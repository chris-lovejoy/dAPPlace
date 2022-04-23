// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Canvas {
    uint8[100] _pixels;

    function set (uint8 x, uint8 y, uint8 v) public {
        uint8 i = (y * 10) + x;
        _pixels[i] = v;
    }

    function get (uint8 x, uint8 y) public view returns (uint8) {
        uint8 i = (y * 10) + x;
        return _pixels[i];
    }

    function pixels () public view returns (uint8[100] memory) {
        return _pixels;
    }
}
