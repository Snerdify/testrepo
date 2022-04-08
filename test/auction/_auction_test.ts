import{GameItem} from './GameItem.sol';
import { expect } from '../chai-setup';
import { setupAuction } from './fixtures';


describe("AuctionEngine",async  function() {
    it ('sould create an auction', async function(){
        const {deployer,accounts} =await setupAuction()
        const Game = await GameItem.new({from:accounts[1]});
        const owner =await GameItem.ownerOf(0);
        expect(owner).to.be.equal(accounts[1]);
        await Game.createauction(Game.address,0, 0,0,10,{from:accounts[1]});


}



   



