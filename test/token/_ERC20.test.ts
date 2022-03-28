import {expect} from "../../chai-setup";
import {setupUsers, setupUser} from '../utils';
import {ethers, deployments, getNamedAccounts,getUnnamedAccounts} from 'hardhat';

async function setup () {
    
    await deployments.fixture(["Token"]);
  
    
    const contracts = {
      Token: (await ethers.getContract('Token')),
    };
  
   
    const {tokenOwner} = await getNamedAccounts();
  
   
    const users = await setupUsers(await getUnnamedAccounts(), contracts);
    
    return {
      ...contracts,
      users,
      tokenOwner: await setupUser(tokenOwner, contracts),
    };
  }
  
 
  describe("Token contract", function() {
  
    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
      
  
     
      it("Should set the right owner", async function () {
        
  
        
        const {Token} = await setup();
  
  
       
        const {tokenOwner} = await getNamedAccounts();
        expect(await Token.owner()).to.equal(tokenOwner);
      });
  
      it("Should assign the total supply of tokens to the owner", async function () {
        const {Token, tokenOwner} = await setup();
        const ownerBalance = await Token.balanceOf(tokenOwner.address);
        expect(await Token.totalSupply()).to.equal(ownerBalance);
      });
    });
  
    describe("Transactions", function () {
      it("Should transfer tokens between accounts", async function () {
        const {Token, users, tokenOwner} = await setup();
        
        await tokenOwner.Token.transfer(users[0].address, 50);
        const users0Balance = await Token.balanceOf(users[0].address);
        expect(users0Balance).to.equal(50);
  
        // Transfer 50 tokens from users[0] to users[1]
        // We use .connect(signer) to send a transaction from another account
        await users[0].Token.transfer(users[1].address, 50);
        const users1Balance = await Token.balanceOf(users[1].address);
        expect(users1Balance).to.equal(50);
      });
  
      it("Should fail if sender doesn’t have enough tokens", async function () {
        const {Token, users, tokenOwner} = await setup();
        const initialOwnerBalance = await Token.balanceOf(tokenOwner.address);
  
        // Try to send 1 token from users[0] (0 tokens) to owner (1000 tokens).
        // `require` will evaluate false and revert the transaction.
        await expect(users[0].Token.transfer(tokenOwner.address, 1)
        ).to.be.revertedWith("Not enough tokens");
  
        // Owner balance shouldn't have changed.
        expect(await Token.balanceOf(tokenOwner.address)).to.equal(
          initialOwnerBalance
        );
      });
  
      it("Should update balances after transfers", async function () {
        const {Token, users, tokenOwner} = await setup();
        const initialOwnerBalance = await Token.balanceOf(tokenOwner.address);
  
        // Transfer 100 tokens from owner to users[0].
        await tokenOwner.Token.transfer(users[0].address, 100);
  
        // Transfer another 50 tokens from owner to users[1].
        await tokenOwner.Token.transfer(users[1].address, 50);
  
        // Check balances.
        const finalOwnerBalance = await Token.balanceOf(tokenOwner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);
  
        const users0Balance = await Token.balanceOf(users[0].address);
        expect(users0Balance).to.equal(100);
  
        const users1Balance = await Token.balanceOf(users[1].address);
        expect(users1Balance).to.equal(50);
      });
    });
  });