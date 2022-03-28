
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;




contract Token {
    string public name = "Token";
    string public symbol = "TOKEN";

    uint256 public totalSupply = 1000000;

    address public owner;

    mapping(address => uint256) balances;

    constructor(address _owner) {
       
       
        balances[_owner] = totalSupply;
        owner = _owner;

    }
    /*
     * @dev transfer function
     *
     * @param address to- address to which the amount will be transfered
     * @param amount - the amount of mooney to be transfered
     */

   
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    /**
     * @dev Function to check the balance
     *
     * @param account- address of the account whose balance we want to check
     * 
     */


     function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}

   
    
    