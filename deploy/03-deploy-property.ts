// Import the necessary hardhat environment and deploy types
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

// Import network configuration and development chain information
import { networkConfig, developmentChains } from "../helper-hardhat-config"

// Import the verify utility function for verifying contract deployment on Etherscan
import verify from "../utils/verify"

// Define the deployProperty function
const deployProperty: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // Get necessary named accounts, deployments, and network details from the hardhat runtime environment
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  // Get the chain ID from the network configuration
  const chainId: number = network.config.chainId!

  // Define the arguments for deploying the Property contract
  const args: any[] = [
    ["1", "Main St", "New York", "NY", "10001", "USA"],
    ["Beautiful House", "This is a spacious and luxurious house with modern amenities.", "For Sale", "House", 1000, 200, 4, 3, 2010, 500000, 1631635200],
    ["John Doe", "johndoe@example.com", "+1 (123) 456-7890"],
    ["QmWpN7qkP4P8fJH5gUQeWjJZK8iWm5W8Vn7XsTJ6VZB7zT", "QmU7UKWmLs3tJcDb8G3wT4nJLp4t1sTz7jKsP9QJdZvQ7r"]
  ]

  // Log the deployment process
  log("----------------------------------------------------")
  log("Deploying Property and waiting for confirmations...")
  
  // Deploy the Property contract using the defined arguments
  const property = await deploy("Property", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })

  // Log the deployment success with the deployed address
  log(`Property deployed at ${property.address}`)

  // If not on a development chain and Etherscan API key is available, verify the contract deployment
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(property.address, args)
  }
  
}

// Export the deployProperty function
export default deployProperty
deployProperty.tags = ["all", "property"] 
