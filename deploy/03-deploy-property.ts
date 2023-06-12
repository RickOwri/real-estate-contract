import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"
 

const deployProperty: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId: number = network.config.chainId!

  const args: any[] = [
    ["1", "Main St", "New York", "NY", "10001", "USA"],
    ["Beautiful House", "This is a spacious and luxurious house with modern amenities.", "For Sale", "House", 1000, 200, 4, 3, 2010, 500000, 1631635200],
    ["John Doe", "johndoe@example.com", "+1 (123) 456-7890"],
    ["QmWpN7qkP4P8fJH5gUQeWjJZK8iWm5W8Vn7XsTJ6VZB7zT", "QmU7UKWmLs3tJcDb8G3wT4nJLp4t1sTz7jKsP9QJdZvQ7r"]
  ]

  log("----------------------------------------------------")
  log("Deploying Property and waiting for confirmations...")
  const property = await deploy("Property", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Property deployed at ${property.address}`)
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(property.address, args)
  }
  
}

export default deployProperty
deployProperty.tags = ["all", "property"] 