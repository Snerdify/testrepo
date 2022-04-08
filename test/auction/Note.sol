pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Note is ERC20 {
    constructor(uint256 initialSupply) ERC20("Note", "NOTE") {
        _mint(msg.sender, initialSupply);
    }
}