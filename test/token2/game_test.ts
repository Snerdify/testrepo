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

describe("Minting Tests", async function () {
    it("should be able to mint", async function () {
        const { mint, users } = await setupGame();
        const uri = "https://gateway.pinata.cloud/ipfs/0x00";
        const x = 20;
        const y = 15;
        const tokenId = await mint(users[0].address, 0, uri);
        const owner = await users[0].GAME.ownerOf(tokenId);
        expect(owner).to.be.equal(users[0].address);
    });

    it("should be able to get URI", async function () {
        const { mint, users } = await setupGame();
        const uri = "https://gateway.pinata.cloud/ipfs/0x00";
        const x = 0;
        const y = 0;
        const tokenId = await mint(users[0].address, 0, uri);
        const tokenURI = await users[0].GAME.tokenURI(tokenId);
        expect(tokenURI).to.be.equal(uri);
    });
});

describe("Transfer Tests", async function () {
    it("Account holder should be able to transfer", async function () {
        const { mint, users } = await setupGame();
        const holder = users[0];
        const x = 0;
        const y = 0;
        const uri = "https://gateway.pinata.cloud/ipfs/0x00";
        const tokenId = await mint(holder.address, 1, uri);
        const newHolder = users[1];
        const receipt = await (await holder.Game.transferFrom(holder.address, newHolder.address, tokenId)).wait();
        const owner = await holder.Game.ownerOf(tokenId);
        expect(owner).to.be.equal(newHolder.address);
    });

});




