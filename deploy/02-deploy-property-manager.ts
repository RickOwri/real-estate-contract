// Import necessary modules and libraries
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"
import { ethers } from "hardhat"
import * as TestTokenContract from "../deployments/mumbai/TestToken.json"

// Define constants for smart contract parameters
const FEE = ethers.utils.parseEther("5") // Fee for creating new properties in ether
const TEST_TOKEN_ADDRESS = TestTokenContract.address // Address of the test token contract
const EXCHANGE_RATIO = 1000 // Ratio of ether to test token for exchanges
const RETURN_PENALTY = 10 // Penalty percentage for returning tokens
const MIN_RETURN_AMOUNT = 1 // Minimum amount of tokens that can be returned

// Define the deploy function for the PropertyManager smart contract
const deployProperty: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // Get the necessary components from Hardhat runtime environment
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId: number = network.config.chainId!

  // Set the arguments for the PropertyManager smart contract constructor
  const args: any[] = [
    FEE,TEST_TOKEN_ADDRESS, EXCHANGE_RATIO,RETURN_PENALTY,MIN_RETURN_AMOUNT
  ]

  // Log the start of deployment
  log("----------------------------------------------------")
  log("Deploying PropertyManager and waiting for confirmations...")
  
  // Deploy the PropertyManager smart contract
  const PropertyManager = await deploy("PropertyManager", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  
  // Log the contract address
  log(`PropertyManager deployed at ${PropertyManager.address}`)
  
  // Verify the contract on Etherscan if not on a development chain
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(PropertyManager.address, args)
  }
}

// Export the deploy function
export default deployProperty
// Assign tags to the deploy function
deployProperty.tags = ["all", "property-manager", "main"] 
