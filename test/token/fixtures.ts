import {
    ethers,
    deployments,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';


import { Event } from '@ethersproject/contracts';
import { setupUsers, setupUser } from '../utils';
import { Token } from '../../src/types';


export const setupToken = deployments.createFixture(async () => {
   
    await deployments.fixture('Token');
    const TOKEN = await ethers.getContract('Token') as Token;
    const accounts = await getNamedAccounts();
    const tokenOwner =await getNamedAccounts();
    
    const ownerBalance = await TOKEN.balanceOf(tokenOwner);
    const supply = await TOKEN.totalSupply();

    

    const unnamedAccounts = await getUnnamedAccounts();

    const users = await setupUsers(unnamedAccounts, {TOKEN});

    const deployer = await setupUser(accounts.deployer, {TOKEN });
    
    const admin = await setupUser(accounts.admin, { TOKEN });

    await deployer.TOKEN.setAdmin(admin.address, true);

    // Mint Setup

    const mint = async (recipient: string, tokenId: number, uri: string) => {
        const receipt = await (await deployer.TOKEN.mint(recipient, tokenId, uri)).wait();
        const event = receipt?.events?.filter(
            (event: Event) => event.event === 'Transfer'
        )[0];
        return event?.args?.tokenId;
    };
    
    return { TOKEN,accounts, ownerBalance  , users, deployer, admin, mint ,supply,tokenOwner};
});