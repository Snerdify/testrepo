

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Game is ERC1155, Ownable {
    
  string public name;
  string public symbol;

  mapping(uint => string) public tokenURI;

  constructor() ERC1155("") {
    name = "Game";
    symbol = "GAME";
  }
    /*
    *@dev -only owner can call the mint function 
    *
    */
  function mint(address _to, uint _id, uint _amount) external onlyOwner {
    _mint(_to, _id, _amount, "");
  }

  /*
  *@dev burn removes the set amount of tokens from the supply
  */
  
  function burn(uint _id, uint _amount) external {
    _burn(msg.sender, _id, _amount);
  }

  /*
  * @dev- setURI gets the uri for the current token 
  *@param - uint_id is the id of the current token
  *
  */

  

  
  function setURI(uint _id, string memory _uri) external onlyOwner {
    tokenURI[_id] = _uri;
    emit URI(_uri, _id);
  }


  /*
  * @dev uri retursn the URI associated with a token's id
  */
  function uri(uint _id) public override view returns (string memory) {
    return tokenURI[_id];
  }

}
    