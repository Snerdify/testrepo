import { ethers } from 'hardhat';
import { expect } from '../chai-setup';
import { setupAuction, setupSale } from './fixtures';
import { BigNumber } from '@ethersproject/bignumber';
import { isTypedArray } from 'util/types';

describe('Auction.sol',async function () {

    it('should have correct NFT address', async function () {
        const { deployer, Land } = await setupSale();
        const nftAddress = await deployer.Sale.NFT();
        expect(nftAddress).to.be.equal(Land.address);
    
    });
describe('Sale Tests', async function () {
    it('should be able to put nft for sale', async function () {
            const { deployer, Auction } = await setupAuction();
            
    );
            await deployer.Auction.approve(Auction.address, tokenId);
            
            expect(setupAuction.nftId).to.be.equal(tokenId);
            expect(setupAuction.price).to.be.equal(price);
            expect(setupAuction.owner).to.be.equal(deployer.address);
            expect(setupAuction.isActive).to.be.equal(true);
    });
    it('should be able to put Land for sale (approvedForAll)', async function () {
            const { deployer, mintLand, Sale } = await setupSale();
            const tokenId = await mintLand(
                deployer.address,
                0,
                0,
                'https://gateway.pinata.cloud/ipfs/0x00'
    );
            await deployer.Land.setApprovalForAll(Sale.address, true);
            const price = ethers.utils.parseEther('5');
            const receipt = await (await deployer.Sale.sellProperty(tokenId, price)).wait();
            const sale = await deployer.Sale.getSale(tokenId);
            expect(sale.nftId).to.be.equal(tokenId);
            expect(sale.price).to.be.equal(price);
            expect(sale.owner).to.be.equal(deployer.address);
            expect(sale.isActive).to.be.equal(true);
    });
    it('owner should be able to enable sale', async function () {
            const { deployer } = await setupSale();
            await (await deployer.Sale.setEnabled(true)).wait();
            const enabled = await deployer.Sale.isEnabled();
            expect(enabled).to.be.equal(true);
    });
    it('should not be able to purchase before sale is enabled', async function () {
            const { deployer, mintLand, Sale, users } = await setupSale();
            const tokenId = await mintLand(
                deployer.address,
                0,
                0,
                'https://gateway.pinata.cloud/ipfs/0x00'
            );
            await deployer.Land.approve(Sale.address, tokenId);
            const price = ethers.utils.parseEther('5');
            await (await deployer.Sale.sellProperty(tokenId, price)).wait();
            await expect(users[0].Sale.purchaseProperty(tokenId)).to.be.revertedWith(
                'Sale is not enabled'
            );
    });
    it('should be able to purchase after sale is enabled', async function () {
            const { deployer, mintLand, Sale, users } = await setupSale();
            const buyer = users[0];
            const tokenId = await mintLand(
                deployer.address,
                0,
                0,
                'https://gateway.pinata.cloud/ipfs/0x00'
            );
            // Put Land for Sale
            await deployer.Land.approve(Sale.address, tokenId);
            const price = ethers.utils.parseEther('5');
            await (await deployer.Sale.sellProperty(tokenId, price)).wait();
            // Enable Sales
            await (await deployer.Sale.setEnabled(true)).wait();
            // Give User funds
            await (
                await deployer.Token.transfer(buyer.address, ethers.utils.parseEther('100'))
            ).wait();
            const deployerBalance = BigNumber.from(
                await deployer.Token.balanceOf(deployer.address)
            );
            const buyerBalance = BigNumber.from(await deployer.Token.balanceOf(buyer.address));
            // Purchase
            await await buyer.Token.approve(Sale.address, price);
            const receipt = await (await buyer.Sale.purchaseProperty(tokenId)).wait();
            const landOwner = await deployer.Land.ownerOf(tokenId);
            const deployerBalance_after = BigNumber.from(
                await deployer.Token.balanceOf(deployer.address)
            );
            const buyerBalance_after = BigNumber.from(
                await deployer.Token.balanceOf(buyer.address)
            );

            expect(landOwner).to.be.equal(buyer.address);
            expect(deployerBalance_after).to.be.equal(deployerBalance.add(price));
            expect(buyerBalance_after).to.be.equal(buyerBalance.sub(price));
        });
        
        
    });
});