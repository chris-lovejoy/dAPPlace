// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Counter {
    uint public counter;

    event Add(uint val);

    constructor () {
        counter = 0;
    }

    function add () public {
        counter++;
        emit Add(counter);
    }

    function get () public view returns (uint) {
        return counter;
    }
}
