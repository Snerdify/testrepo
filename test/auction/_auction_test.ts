import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from '../chai-setup';
import { setupNFT } from '../nft/fixtures';
import { setupAuction } from './fixtures';

describe('Auction', async function(){
    const Auction=await ethers.getContractFactory('Auction');
    const Contract=await Auction.deploy();
    
    beforeEach('create an nft instance',async function(){
        Nft = await Nft.new({from:accounts[0]})
    })
})

describe('Function tests',async function(){
    it('Should be able to start  place a bid ',async function(){
        const{deployer,Nft} = await setupAuction();
        const nftAddress = await deployer.Auction.NFT();
        expect(nftAddress).to.be.equal(Nft.address);

    });



});
  
