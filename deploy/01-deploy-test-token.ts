/**
 * Imports required modules and types from external packages.
 */
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import verify from "../utils/verify";

/**
 * Deploys the Property contract.
 * @param hre The Hardhat runtime environment.
 */
const deployProperty: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  log("----------------------------------------------------");
  log("Deploying Property and waiting for confirmations...");

  // Deploys the TestToken contract
  const testToken = await deploy("TestToken", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  log(`TestToken deployed at ${testToken.address}`);
  log(`TestToken deployed at ${testToken.address}`);

  // Verifies the TestToken contract on Etherscan if required
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(testToken.address, []);
  }
};

export default deployProperty;

// Adds tags to the deployProperty function
deployProperty.tags = ["all", "test-token", "main"];
