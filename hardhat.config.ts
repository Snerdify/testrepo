import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import "@typechain/hardhat";

//import '@nomiclabs/hardhat-ethers';
//import '@nomiclabs/hardhat-waffle';



const config: HardhatUserConfig = {
  solidity: {
    compilers:[
      {version: '0.7.6'},
      {version: '0.8.0'},
      {version:'0.8.12'},
      {version:'0.8.12'},
      {version:'0.7.6'},
      
    ]
   
    
  },  
 
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
  },
 
 
  paths: {
    sources: "src",
  },
  
 
};
export default config;