// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is IERC20 , ERC20{

    mapping(address => uint256) public _balances;
    mapping(address => mapping(address => uint)) public _allowances;
    uint256 public totalSupply ;
    string public _name;
    string public _symbol;
    uint8 public decimals;


    /**
     * @dev Sets the values for name and symbol
     */
    constructor(string memory _name,string memory _symbol) ERC20('Token','TOKEN'){
        
    }

    /**
    * @dev Returns the name of the token.
    */
    function name() public view  returns (string memory) {
        return _name;
    }

    /**
    * @dev Returns the symbol of the token, 
    */
    function symbol() public view  returns (string memory) {
        return _symbol;
    }

    /*
    *@dev returns the total supply of token
    */
    function totalSupply() public view  returns (uint256) {
        return _totalSupply;
    }

    

    /**
    * @dev Returns the balance of the token holder
    */
    function balanceOf(address account) public view  returns (uint256) {
        return _balances[account];
    }

    /*
   * @dev transfer transfers the amount from owner to recipient
   * @param address recipient is the address which will receive the amount
   * @param uint amount is the amount being transfered
   */
    function transfer(address recipient, uint amount) external returns (bool) {
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        
        emit Transfer(msg.sender, recipient, amount);
        return true;     
    }



    function allowance(address owner, address spender) public view  returns (uint256) {
        return _allowances[owner][spender];
    }


    /*
   * @dev  creates tokens and assigns them to the owner and increaes the total supply
   * Emits a {Transfer} event with from set to zero address
   * 
   */
    function mint(uint amount) external { 
        _balances[msg.sender] += amount; 
        _totalSupply += amount; 
        emit Transfer(address(0), msg.sender, amount);  

    }

    /*
   * @dev destroys 'amount' of tokens from the owner's account
   * reduces the total supply
   * Emits a {Transfer} event with `to` set to the zero address.
   * 
   */

        function burn(uint amount) external {
        _balances[msg.sender] -= amount;
        _totalSupply -= amount; 
        emit Transfer(msg.sender, address(0), amount);  
    }


     /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     * Emits an {Approval} event.
     * Requirements:
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
}

    
   
    
    