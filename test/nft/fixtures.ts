import {
    ethers,
    deployments,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';


import { setupUsers, setupUser } from '../utils';
import { nft } from '../../src/types';

export const setupNFT = deployments.createFixture(async () => {
    await deployments.fixture('nft');
    const NFT = await ethers.getContract('nft') as nft;
   
    const accounts = await getNamedAccounts();

    const unnamedAccounts = await getUnnamedAccounts();

    const users = await setupUsers(unnamedAccounts, { NFT });

    const deployer = await setupUser(accounts.deployer, { NFT });

    const admin = await setupUser(accounts.admin, { NFT });

    await deployer.NFT.setAdmin(admin.address, true);



    const mint = async (recipient: string, tokenId: number, uri: string) => {
        const receipt = await (await deployer.NFT.mint(recipient, tokenId, uri)).wait();
        const event = receipt?.events?.filter(
            (event: Event) => event.event === 'Transfer'
        )[0];
        return event?.args?.tokenId;
    };
    
    return { NFT, users, deployer, admin, mint };
});