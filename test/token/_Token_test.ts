import { ethers } from 'hardhat';
import {expect} from "../chai-setup";
import { BigNumber } from 'ethers';
import{setupToken} from './fixtures';



 
  describe("Token.sol", function() {
    

      it('should have correct name and symbol',async  function(){
        const {deployer} = await setupToken();
        const name = await deployer.TOKEN.name();
        const symbol=await deployer.TOKEN.symbol();
        expect(name).to.be.equal("Token");
        expect(symbol).to.be.equal("TOKEN");


      });

     

      it ('should have correct supply',async function(){
        const {TOKEN} =await setupToken();
        const{supply} =await TOKEN.totalSupply();
        expect(supply).to.be.equal(ethers.utils.parseEther('100000000'))


      });


      it('should be able to assign total supply of tokens to the owner',async function(){
          const {TOKEN} =await setupToken();
          const {tokenOwner} = await TOKEN.accounts();
          const ownerBalance = await TOKEN.balanceOf(tokenOwner);
          const supply = await TOKEN.totalSupply();
          expect (ownerBalance).to.be.equal(supply);
      });


});

    

  
    describe("Transactions", function () {


      it("Should be able to transfer ", async function () {
        const {TOKEN  , users, tokenOwner} = await setupToken();
        const from = tokenOwner;
        const to = users[0];
        const fromBalance = BigNumber.from(await TOKEN.balanceOf(from.address));
        const toBalance = BigNumber.from(await TOKEN.balanceOf(to.address));
        const amount= ethers.utils.parseEther('300');
        await expect(TOKEN.transfer(to.address,amount)).to.emit(TOKEN,'Transfer');
        const fromBalance_new = BigNumber.from(await TOKEN.balanceOf(from.address));
        const toBalance_new = BigNumber.from(await TOKEN.balanceOf(to.address));
        expect(fromBalance_new).to.be.equal(fromBalance.sub(amount));
        expect(toBalance_new).to.be.equal(toBalance.add(amount));
       
      });

  
      it("Should fail if sender doesn’t have enough tokens", async function () {
        const {TOKEN, users, tokenOwner} = await setupToken();
        const initialOwnerBalance = await TOKEN.balanceOf(tokenOwner.address);
  
        
        await expect(users[0].TOKEN.transfer(tokenOwner.address, 1)
        ).to.be.revertedWith("Not enough tokens");
  
        
        expect(await TOKEN.balanceOf(tokenOwner.address)).to.equal(
          initialOwnerBalance
        );
      });

      it('holder should be able to approve', async () => {
        const { users, tokenOwner, TOKEN } = await setupToken();
        const approver = tokenOwner;
        const spender = users[0];
        const amount = ethers.utils.parseEther('300');
        await expect(TOKEN.approve(spender.address, amount)).to.emit(TOKEN, 'Approval');
        const allowance = await TOKEN.allowance(approver.address, spender.address);
        expect(allowance).to.be.equal(amount);

  
      it("Should update balances after transfers", async function () {
        const {TOKEN, users, tokenOwner} = await setupToken();
        const initialOwnerBalance = await TOKEN.balanceOf(tokenOwner.address);
  
       
        await TOKEN.transfer(users[0].address, 100);
  
        
        await TOKEN.transfer(users[1].address, 50);
  
        
        const finalOwnerBalance = await TOKEN.balanceOf(tokenOwner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);
  
        const users0Balance = await TOKEN.balanceOf(users[0].address);
        expect(users0Balance).to.equal(100);
  
        const users1Balance = await TOKEN.balanceOf(users[1].address);
        expect(users1Balance).to.equal(50);
      });
});
