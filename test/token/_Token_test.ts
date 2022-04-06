
import {expect} from "../chai-setup";
import {setupUsers, setupUser} from '../utils';
import{setupToken} from './fixtures';



 
  describe("Token.sol", function() {
    

      it('should have correct name and symbol',async  function(){
        const {deployer} = await setupToken();
        const name = await deployer.TOKEN.name();
        const symbol=await deployer.TOKEN.symbol();
        expect(name).to.be.equal("Token");
        expect(symbol).to.be.equal("TOKEN");


      });

      it("Should set the right owner", async function () {
        const { users,deployer }= await setupToken();
        const tokenOwner = await deployer.setupToken.getNamedAccounts();
       
        expect(tokenOwner).to.be.true;
      });


      it('should be able to assign total supply of tokens to the owner',async function(){
          const {deployer} =await setupToken();
          const {tokenOwner} = await setupToken.getNamedAccounts();
          const ownerBalance = await setupToken.balanceOf(tokenOwner);
          const supply = await setupToken.totalSupply();
          expect (ownerBalance).to.be.equal(supply);
      });


});

    

  
    describe("Transactions", function () {


      it("Should transfer tokens between accounts", async function () {
        const {TOKEN  , users, tokenOwner} = await setupToken();
        
        await tokenOwner.Token.transfer(users[0].address, 100);
        const users0Balance = await TOKEN.balanceOf(users[0].address);
        expect(users0Balance).to.equal(100);
  
       
        await users[0].Token.transfer(users[1].address, 100);
        const users1Balance = await TOKEN.balanceOf(users[1].address);
        expect(users1Balance).to.equal(100);
      });

  
      it("Should fail if sender doesn’t have enough tokens", async function () {
        const {Token, users, tokenOwner} = await setupToken();
        const initialOwnerBalance = await Token.balanceOf(tokenOwner.address);
  
        
        await expect(users[0].Token.transfer(tokenOwner.address, 1)
        ).to.be.revertedWith("Not enough tokens");
  
        
        expect(await Token.balanceOf(tokenOwner.address)).to.equal(
          initialOwnerBalance
        );
      });



  
      it("Should update balances after transfers", async function () {
        const {Token, users, tokenOwner} = await setupToken();
        const initialOwnerBalance = await Token.balanceOf(tokenOwner.address);
  
       
        await tokenOwner.Token.transfer(users[0].address, 100);
  
        
        await tokenOwner.Token.transfer(users[1].address, 50);
  
        
        const finalOwnerBalance = await Token.balanceOf(tokenOwner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);
  
        const users0Balance = await Token.balanceOf(users[0].address);
        expect(users0Balance).to.equal(100);
  
        const users1Balance = await Token.balanceOf(users[1].address);
        expect(users1Balance).to.equal(50);
      });
});
