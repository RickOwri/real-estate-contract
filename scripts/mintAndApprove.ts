import { ethers } from "hardhat"
import { TestToken__factory } from "../typechain-types"
import "dotenv/config";

import * as PropertyContract from "../deployments/mumbai/PropertyManager.json"
import * as TestTokenContract from "../deployments/mumbai/TestToken.json"
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL as string)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
  const signer = wallet.connect(provider);
  const testToken = TestToken__factory.connect(TestTokenContract.address, signer)
  const signerTokenBalance = await testToken.balanceOf(signer.address)
  const burnToken =  await testToken.burnFrom(signer.address, signerTokenBalance)
  const burnTokenReceipt = await burnToken.wait()
  console.log(`Burn ${ethers.utils.formatEther(signerTokenBalance)} from ${signer.address} at ${burnTokenReceipt.transactionHash}`)
  const mintToken =  await testToken.mint(signer.address, ethers.utils.parseEther("10"))
  const mintTokenReceipt = await mintToken.wait()
  console.log(`Mint 10 tokens to ${signer.address} at ${mintTokenReceipt.transactionHash}`)
  const approveToPropertyManager = await testToken.approve(PropertyContract.address, ethers.utils.parseEther("10"))
  const approveToPropertyManagerReceipt = await approveToPropertyManager.wait()
  console.log(`Approve 10 tokens to PropertyManager(${PropertyContract.address}) at ${approveToPropertyManagerReceipt.transactionHash}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })