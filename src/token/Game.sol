

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


import "../utils/AccessProtected.sol";


contract Game is ERC1155, AccessProtected
 
 {
    
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
  function mint(address recipient, uint256 tokenId , uint _amount, string memory URI) external onlyAdmin {
    _mint(recipient, tokenId, _amount, "");
     _setTokenURI(tokenId, URI);
  }



  function setURI(uint256 tokenId, string memory tokenURI)
        external
        onlyAdmin
    {
        _setTokenURI(tokenId, tokenURI);
    }



  /*
  *@dev burn removes the set amount of tokens from the supply
  */
  
  function burn(address sender, uint256 tokenId,  uint _amount)public onlyRole(BURNER_ROLE) {
    _burn(sender, tokenId  , _amount);
  }




  
  

  
  


   