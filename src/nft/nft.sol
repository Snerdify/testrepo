// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
pragma abicoder v2;



import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../utils/AccessProtected.sol";



contract nft is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Item", "ITEM") {}


    /*
    *@dev mint mints new items
    * @param addrress recipient 
    * @param uint256 tokenId is the current id of the token 
    * @ param string memory uri is the uri of the current token id
    */
    function mint(address recipient,uint256 tokenId,string memory URI) external onlyAdmin {
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, URI);


    }


    /*
    *@dev setURI sets the URI associated with the current tokenId
    * @param uint256 tokenId is the current token id
    * @param string memory tokenUri is the uri of the current token
    */

     function setURI(uint256 tokenId, string memory tokenURI)
        external
        onlyAdmin
    {
        _setTokenURI(tokenId, tokenURI);
    }

    

    /*
    *@dev burn burns the nfts
    * @param uint256 is the token id of the nft
    * 
    */


    function burn(address sender, uint256 tokenId) public onlyRole(BURNER_ROLE) {
        _burn(sender,tokenId );

    }


}

