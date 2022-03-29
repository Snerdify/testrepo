// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./IERC20.sol";



contract Token is IERC20 {
    string public name = "Token";
    string public symbol = "TOKEN";

    uint256 public totalSupply = 1000000;

    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

   
   /*
   * @dev transfer transfers the amount from owner to recipient
   * @param address recipient is the address which will receive the amount
   * @param uint amount is the amount being transfered
   */
    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        
        emit Transfer(msg.sender, recipient, amount);
        return true;     }

     /*
   * @dev mint mints new tokens
   * @param uint amount is the amount of tokens being minted
   * 
   */
    function mint(uint amount) external { 
        balanceOf[msg.sender] += amount; 
        totalSupply += amount; 
        emit Transfer(address(0), msg.sender, amount);  

    }

       /*
   * @dev burn burns the tokens
   * @param uint amount is the amount of tokens being burned
   * 
   */

        function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount; 
        emit Transfer(msg.sender, address(0), amount);  
    }
}
    
   
    
    