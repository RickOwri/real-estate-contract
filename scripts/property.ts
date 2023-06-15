// Import necessary modules and configurations
import { ethers } from "hardhat"
import { Property__factory } from "../typechain-types"
import "dotenv/config";

async function main() {
  // Connect to Mumbai testnet with provided environment variable
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL as string)

  // Use a wallet based on the private key provided via environment variable
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);

  // Sign transactions with the connected provider
  const signer = wallet.connect(provider);

  // Connect to the Property contract using a hardcoded address and the signer
  const property = Property__factory.connect("0xB2BF1C62829493c331975bb2875843B8AFCCbf47", signer)

  // Log the owner of the Property contract
  console.log(await property.owner())

  // Log the propertyData of the Property contract
  console.log((await property.propertyData()))

  // Log the imagesCid of the Property contract
  console.log(await property.getImagesCid())
}

// Call the main function and handle possible errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
