// Import necessary modules and configurations
import { ethers } from "hardhat"
import { PropertyManager__factory } from "../typechain-types"
import "dotenv/config";

// Define the arguments for creating a new property
const args =  [
  ["1", "Main St", "New York", "NY", "10001", "USA"],
  ["Beautiful House", "This is a spacious and luxurious house with modern amenities.", "For Sale", "House", 1000, 200, 4, 3, 2010, 500000, 1631635200],
  ["John Doe", "johndoe@example.com", "+1 (123) 456-7890"],
  ["QmWpN7qkP4P8fJH5gUQeWjJZK8iWm5W8Vn7XsTJ6VZB7zT", "QmU7UKWmLs3tJcDb8G3wT4nJLp4t1sTz7jKsP9QJdZvQ7r"]
]

async function main() {
  // Connect to Mumbai testnet with provided environment variable
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL as string)

  // Use a wallet based on the private key provided via environment variable
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);

  // Sign transactions with the connected provider
  const signer = wallet.connect(provider);

  // Connect to the PropertyManager contract using a hardcoded address and the signer
  const PropertyManager = PropertyManager__factory.connect("0x26E914456669C8b6bd51607C45391b8edfDD990a", signer)

  // Log the owner of the PropertyManager contract
  console.log(await PropertyManager.owner())

  // Deploy a new property using the predefined arguments
  const deployProperty = await PropertyManager.createNewProperty(args[0] as any , args[1] as any, args[2] as any, args[3] as any)

  // Wait for the transaction to be mined and get the receipt
  const deployPropertyReceipt = await deployProperty.wait()

  // Retrieve the address of the deployed property
  const deployedPropertyAddress = await PropertyManager.properties(0)

  // Log the transaction hash of the property deployment
  console.log(deployPropertyReceipt.transactionHash)
}

// Call the main function and handle possible errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
