import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"
import { ethers } from "hardhat"
import * as TestTokenContract from "../deployments/mumbai/TestToken.json"


/*fee = _fee;
i_testToken = _testToken;
exchangeRatio = _exchangeRatio;
returnPenalty = _returnPenalty;
minReturnAmount = _minReturnAmount; */
const FEE = ethers.utils.parseEther("5")
const TEST_TOKEN_ADDRESS = TestTokenContract.address
const EXCHANGE_RATIO = 1000 
const RETURN_PENALTY = 10
const MIN_RETURN_AMOUNT = 1


const deployProperty: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId: number = network.config.chainId!

  const args: any[] = [
    FEE,TEST_TOKEN_ADDRESS, EXCHANGE_RATIO,RETURN_PENALTY,MIN_RETURN_AMOUNT
  ]

  log("----------------------------------------------------")
  log("Deploying Property and waiting for confirmations...")
  const PropertyManager = await deploy("PropertyManager", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Property deployed at ${PropertyManager.address}`)
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(PropertyManager.address, args)
  }
}

export default deployProperty
deployProperty.tags = ["all", "property-manager", "main"] 