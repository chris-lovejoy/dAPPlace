// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Canvas {
    event Set (uint8 x, uint8 y, uint8 v);
    event Image ();

    struct Change {
        uint8 val;
        address acc;
    }

    uint8 public counter;
    Change[100] _changes;

    function set (uint8 x, uint8 y, uint8 v) public {
        uint8 i = (y * 10) + x;
        _changes[i] = Change({ val: v, acc: msg.sender });
        emit Set(x, y, v);

        counter += 1;
        counter = counter % 100;

        if (counter == 0)
            emit Image();
    }

    function get (uint8 x, uint8 y) public view returns (Change memory) {
        uint8 i = (y * 10) + x;
        return _changes[i];
    }

    function pixels () public view returns (Change[100] memory) {
        return _changes;
    }
}
