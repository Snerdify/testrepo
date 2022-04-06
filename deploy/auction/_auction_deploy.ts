import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";


const func:DeployFunction =async function (hre:HardhatRuntimeEnvironment) {

    const {deployments , getNamedAccounts} =hre;
    const {deploy}=deployments;
    const{deployer} =await getNamedAccounts();

    await deploy('Auction' , {
        from: deployer,
        skipIfAlreadyDeployed:true,
        contract:'Auction',
        args:[],
        log:true,
        });
    
};

export default func;
func.tags= ['Auction'];

