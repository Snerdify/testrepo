import{GameItem} from './GameItem.sol';
import { expect } from '../chai-setup';
import { setupAuction } from './fixtures';
import {Note} from './Note.sol';
import {ethers} from hardhat/types ;
import {Auction} from '../../src/types';
import { AssertionError } from 'chai';
import { notEqual } from 'assert';


describe("AuctionEngine",async  function() {
    it ('sould create an auction', async function(){
        const {deployer,accounts} =await setupAuction()
        const Game = await GameItem.new({from:accounts[1]});
        const owner =await GameItem.ownerOf(0);
        const note= await Note.new({from:accounts[0]})
        expect(owner).to.be.equal(accounts[1]);
        await Auction.createauction(Game.address,0,note.address, 0,0,10,{from:accounts[1]});

    it ('Should not create an Auction if the msg.sender is not the Asset owner',async function(){
        const Game= await GameItem.new({from:accounts[1]});
        const owner = await Game.ownerOf(0);
        expect(owner).to.be.equal(accounts[1]);
        const note= await Note.new({from:accounts[0]});
        await Game.approve(Auction.address ,0 , {from:accounts[1]});
        await (Auction.createauction(Game.address,0,note.address, 0,0,10,{from:accounts[0]})).to.be.revertedWith('Account[0] is not the owner');

    });

    it ('should bid and transfer the tokens',async function(){
        await Game.approve(Auction.address ,0 , {from:accounts[1]});
        const note= await Note.new({from:accounts[0]})
        const beforeBalance = await note.balanceOf(accounts[0]);
        const initialBalance = 1000 * (10**6);
        expect(beforeBalance).to.be.equal(initialBalance);

        await note.approve(Auction.address,2000,{from:accounts[0]});
        await Auction.bid(,2000,{rom:accounts[0]});

        const afterBalance=await note.balanceOf(accounts[0]);
        expect(afterBalance).to.be.equal(initialBalance-2000);

        const AuctionBalance=await note.balanceOf(Auction.address);
        expect(AuctionBalance).to.be.equal(2000);
        

    })


}



   



