import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";


const func:DeployFunction =async function (hre:HardhatRuntimeEnvironment) {

    const {deployments , getNamedAccounts} =hre;

    const{deploy}=deployments;
    const{deployer} = await getNamedAccounts();


    await deploy('Game',{
        from:deployer,
        skipIfAlreadyDeployed:true,
        contract:'Game',
        args:[],
        log:true,


    });
    
};

export default func;
func.tags= ['Game'];