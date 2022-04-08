import { expect } from "../chai-setup";
import { setupGame } from './fixtures';

describe('Game.sol',async function(){
    it ('should have correct name and symbol', async function(){
        const {deployer} =await setupGame();
        const name = await deployer.GAME.name();
        const symbol = await deployer.GAME.symbol();
        expect(name).to.be.equal('Game');
        expect(symbol).to.be.equal('GAME');
    });



});

describe("Access Tests", async function () {

    it("owner should be able to set admin", async function () {
        const { users, deployer } = await setupGame();
        const receipt = await deployer.GAME.setAdmin(users[0].address, true);
        const isAdmin = await deployer.GAME.isAdmin(users[0].address);
        expect(isAdmin).to.equal(true);
    });

describe("Minting Tests", async function () {
    it("should be able to mint", async function () {
        const { mint, users } = await setupGame();
        
        const tokenId = await mint(users[0].address, 0);
        const owner = await users[0].GAME.ownerOf(tokenId);
        expect(owner).to.be.equal(users[0].address);
    });

    
});

describe("Transfer Tests", async function () {
    it("Account holder should be able to transfer", async function () {
        const { mint, users } = await setupGame();
        const holder = users[0];
       
        const tokenId = await mint(holder.address, 1);
        const newHolder = users[1];
        const receipt = await (await holder.GAME.transferFrom(holder.address, newHolder.address, tokenId)).wait();
        const owner = await holder.GAME.ownerOf(tokenId);
        expect(owner).to.be.equal(newHolder.address);
    });

});




