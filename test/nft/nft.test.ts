
import { expect } from "../chai-setup";
import { setupNFT } from './fixtures';

describe("Check name and symbol", () => {

    it("should pass with correct name", async () => {
        const { deployer } = await setupNFT();
        const name = await deployer.NFT.name();
        expect(name).to.be.equal("Nft");
    
       
    });

    it("should pass with correct symbol", async () => {
        const { deployer } = await setupNFT();
        const symbol = await deployer.NFT.symbol();
        expect(symbol).to.be.equal("NFT ");
        
    });

});

describe("Access Tests", async function () {
    it("owner should be able to set admin", async function () {
        const { users, deployer } = await setupNFT();
        const receipt = await deployer.NFT.setAdmin(users[0].address, true);
        const isAdmin = await deployer.NFT.isAdmin(users[0].address);
        expect(isAdmin).to.equal(true);
    });

    it("non-owner should not be able to set admin", async function () {
        const { users } = await setupNFT();
        await expect(users[0].NFT.setAdmin(users[0].address, true))
            .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("admin should not be able to set admin", async function () {
        const { users, admin } = await setupNFT();
        await expect(admin.NFT.setAdmin(users[0].address, true))
            .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("owner should not be able to revoke admin", async function () {
        const { deployer, admin } = await setupNFT();
        const receipt = await deployer.NFT.setAdmin(admin.address, false);
        const isAdmin = await deployer.NFT.isAdmin(admin.address);
        expect(isAdmin).to.equal(false);
    });

});

describe("Minting Tests", async function () {
    it("should be able to mint", async function () {
        const { mint, users } = await setupNFT();
        const uri = "https://gateway.pinata.cloud/ipfs/0x00";
        const x = 20;
        const y = 15;
        const tokenId = await mint(users[0].address, 0, uri);
        const owner = await users[0].NFT.ownerOf(tokenId);
        expect(owner).to.be.equal(users[0].address);
    });

    it("should be able to get URI", async function () {
        const { mint, users } = await setupNFT();
        const uri = "https://gateway.pinata.cloud/ipfs/0x00";
        const x = 0;
        const y = 0;
        
        const tokenId = await mint(users[0].address, 0, uri);
        const tokenURI = await users[0].NFT.tokenURI(tokenId);
        expect(tokenURI).to.be.equal(uri);
    });



    describe("Transfer Tests", async function () {
        it("holder should be able to transfer", async function () {
            const { mint, users } = await setupNFT();
            const holder = users[0];
            const x = 0;
            const y = 0;
            const uri = "https://gateway.pinata.cloud/ipfs/0x00";
            const tokenId = await mint(holder.address, 1, uri);
            const newHolder = users[1];
            const receipt = await (await holder.NFT.transferFrom(holder.address, newHolder.address, tokenId)).wait();
            const owner = await holder.NFT.ownerOf(tokenId);
            expect(owner).to.be.equal(newHolder.address);
        });
        it("holder should be able to approve", async function () {
            const { mint, users } = await setupNFT();
            const holder = users[0];
            const x = 0;
            const y = 0;
            const uri = "https://gateway.pinata.cloud/ipfs/0x00";
            const tokenId = await mint(holder.address, 1, uri);
            const approved = users[1];
            const receipt = await (await holder.NFT.approve(approved.address, tokenId)).wait();
            const _approved = await holder.NFT.getApproved(tokenId);
            expect(_approved).to.be.equal(approved.address);
        });
        it("approved should be able to transfer", async function () {
            const { mint, users } = await setupNFT();
            const holder = users[0];
            const x = 0;
            const y = 0;
            const uri = "https://gateway.pinata.cloud/ipfs/0x00";
            const tokenId = await mint(holder.address, 1, uri);
            const approved = users[1];
            await (await holder.NFT.approve(approved.address, tokenId)).wait();
            const receipt = await (await approved.NFT.transferFrom(holder.address, approved.address, tokenId)).wait();
            const owner = await holder.NFT.ownerOf(tokenId);
            expect(owner).to.be.equal(approved.address);
        });
        it("holder should be able to approve for all", async function () {
            const { users } = await setupNFT();
            const holder = users[0];
            const approved = users[1];
            const receipt = await (await holder.NFT.setApprovalForAll(approved.address, true)).wait();
            const isApprovedForAll = await holder.NFT.isApprovedForAll(holder.address, approved.address);
            expect(isApprovedForAll).to.be.equal(true);
        });
        it("operator should be able to transfer from holder", async function () {
            const { mint, users } = await setupNFT();
            const holder = users[0];
            const tokenId_1 = await mint(holder.address, 1, "https://gateway.pinata.cloud/ipfs/0x00");
            const tokenId_2 = await mint(holder.address, 2, "https://gateway.pinata.cloud/ipfs/0x01");
            const approved = users[1];
            await (await holder.NFT.setApprovalForAll(approved.address, true)).wait();
            await (await approved.NFT.transferFrom(holder.address, approved.address, tokenId_1)).wait();
            await (await approved.NFT.transferFrom(holder.address, approved.address, tokenId_2)).wait();
            const owner_1 = await holder.NFT.ownerOf(tokenId_1);
            const owner_2 = await holder.NFT.ownerOf(tokenId_2);
            expect(owner_1).to.be.equal(approved.address);
            expect(owner_2).to.be.equal(approved.address);
        });
    });
});


