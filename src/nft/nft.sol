// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
pragma abicoder v2;



import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../utils/AccessProtected.sol";
import "./IERC721.sol";



contract nft is IERC721 , ERC721 {
    // mapping from tokenId to owner address
    mapping(uint256=>address) private tokenOwner;

    //mapping from owner address to token count
    mapping(address => uint256 []) private ownedTokens;

   //mapping from tokenId to approved Addresses
    mapping(uint256 => address ) private tokenApprovals ;



    /*
    *@dev balanceOf returns the number of tokens owned by the address
    */
   function balanceOf(address owner) public view returns (uint256){
       require(owner !=address(0) ,"owner=zero address") ;
       return ownedTokens[owner].length;
   }

   /*
   */
    function ownerOf(uint256 tokenId) public view returns(address){
        address owner = tokenOwner[tokenId];
        require(owner!=address(0),"Address does not exist");
        return owner;


    }

    modifier onlyOwner (uint256 tokenId){
        require(ownerOf(tokenId)= msg.sender);
        _;
    }

    function approvedFor(uint256 tokenId) public view returns (address){
        require(tokenOwner[tokenId]!=address(0),"Token does not exist");
        return tokenApprovals[tokenId];
    }

    function approve(address to,uint256 tokenId) public onlyOwner(tokenId){
        address owner =ownerOf(tokenId);
        require(to!=owner,"Address should not be same as owner");
        if(approvedFor((tokenId)!=0 || to !=0 ){
            tokenApprovals[tokenId] = to;
            Approval(owner , to , tokenId);
            
        }
       
    }

    /*
    */
    function transfer(address to ,uint256 tokenId) public onlyOwner (tokenId){
        require(to!= address(0) ,"Transfer to zero address not possible");
        //ownedTokens[from] -= 1;
        ownedTokens[to]+= 1;
        emit Transfer(from,to,tokenId);
    }

    

    function mint(address to, uint256 tokenId) external{
        require(to != address(0) ,"Mint ot zero address ");
        require(tokenOwners[tokenId]==address(0),"Token Already minted");

        ownedTokens[to] += 1;
        ownedTokens[tokenId]=to;

        emit Transfer(address(0),tokenId);



    }

    function burn(uint256 tokenId) external{
        address owner=ownerOf(tokenId);
        ownedTokens[owner] -= 1;
        delete tokenOwners[tokenId];
        emit Transfer(owner,address(0),tokenId);
    }

    





   


   
   
}

