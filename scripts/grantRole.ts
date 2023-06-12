import { ethers } from "hardhat"
import { TestToken__factory } from "../typechain-types"
import "dotenv/config";

import * as PropertyManagerContract from "../deployments/mumbai/PropertyManager.json"
import * as TestTokenContract from "../deployments/mumbai/TestToken.json"

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL as string)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
  const signer = wallet.connect(provider);
  const testToken = TestToken__factory.connect(TestTokenContract.address, signer)
  const getMinterRole = await testToken.MINTER_ROLE()
  const grantRole = await testToken.grantRole(getMinterRole, PropertyManagerContract.address) // grant role to PropertyManager contract 
  const grantRoleReceipt = await grantRole.wait()
  console.log(`Grant ${getMinterRole} to PropertyManagerContract(${PropertyManagerContract.address}) at ${grantRoleReceipt.transactionHash}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })