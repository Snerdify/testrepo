import {
    ethers,
    deployments,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';


import { Event } from '@ethersproject/contracts';
import { setupUsers, setupUser } from '../utils';
import { Game } from '../../src/types';


export const setupGame = deployments.createFixture(async () => {
    // Deployment Setup
    await deployments.fixture('Game');

    const GAME = await ethers.getContract('Game') as Game;
    // Account Setup
    const accounts = await getNamedAccounts();

    const unnamedAccounts = await getUnnamedAccounts();

    const users = await setupUsers(unnamedAccounts, { GAME });

    const deployer = await setupUser(accounts.deployer, { GAME });

    const admin = await setupUser(accounts.admin, { GAME });

    await deployer.GAME.setAdmin(admin.address, true);

    // Mint Setup

    const mint = async (recipient: string, tokenId: number, uri: string) => {
        const receipt = await (await deployer.GAME.mint(recipient, tokenId, uri)).wait();
        const event = receipt?.events?.filter(
            (event: Event) => event.event === 'Transfer'
        )[0];
        return event?.args?.tokenId;
    };
    
    return { GAME, users, deployer, admin, mint };
});