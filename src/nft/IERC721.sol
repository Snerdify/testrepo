// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

interface ERC721{
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approve(address indexed owner,address indexed approved, uint256 indexed tokenId);

    function balanceOf(address owner) public view returns (uint256 balance);

    function ownerOf(uint256 tokenId) public view returns (address owner);

    function transfer(address to , uint256 tokenId ) public ;

    function approve(address to, uint256) public;

    function tokenownership(uint256 tokenId) public;

}