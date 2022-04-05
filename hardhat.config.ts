import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import "@typechain/hardhat";


const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
  },
 //named accounts
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
  },
 
 
  paths: {
    sources: "src",
  },
  
 
};
export default config;