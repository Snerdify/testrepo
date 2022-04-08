import {
    ethers,
    deployments,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';

import { setupUsers, setupUser } from '../utils';
import { Auction } from '../../src/types';
import {GameItem} from './GameItem.sol'
export const setupAuction = deployments.createFixture(async () => {
    
    await deployments.fixture('Auction');
    

    const Auction = await ethers.getContract('Auction') as Auction;
    
    const accounts = await getNamedAccounts();

    const unnamedAccounts = await getUnnamedAccounts();

    const users = await setupUsers(unnamedAccounts, { Auction });

    const deployer = await setupUser(accounts.deployer, { Auction});

    const admin = await setupUser(accounts.admin, { Auction});

    await deployer.Auction.setAdmin(admin.address, true);

  

    
    return { Auction, users, deployer, admin,accounts};
});


