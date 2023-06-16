// Import necessary modules and configurations
import { ethers } from "hardhat"
import { TestToken__factory } from "../typechain-types"
import "dotenv/config";
import * as PropertyManagerContract from "../deployments/mumbai/PropertyManager.json"
import * as TestTokenContract from "../deployments/mumbai/TestToken.json"

// Main function
async function main() {
  // Connect to Mumbai testnet with provided environment variable
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL as string)

  // Use a wallet based on the private key provided via environment variable
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);

  // Sign transactions with the connected provider
  const signer = wallet.connect(provider);

  // Connect to the TestToken contract using the contract address and the signer
  const testToken = TestToken__factory.connect(TestTokenContract.address, signer)

  // Retrieve the MINTER_ROLE of the TestToken contract
  const getMinterRole = await testToken.MINTER_ROLE()

  // Grant MINTER_ROLE to the PropertyManager contract
  const grantRole = await testToken.grantRole(getMinterRole, PropertyManagerContract.address) 

  // Wait for the transaction to be mined and get the transaction receipt
  const grantRoleReceipt = await grantRole.wait()

  // Log the transaction hash of the GrantRole transaction
  console.log(`Grant ${getMinterRole} to PropertyManagerContract(${PropertyManagerContract.address}) at ${grantRoleReceipt.transactionHash}`)
}

// Call the main function and handle possible errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
