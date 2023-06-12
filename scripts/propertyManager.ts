import { ethers } from "hardhat"
import { PropertyManager__factory } from "../typechain-types"
import "dotenv/config";

const args =  [
  ["1", "Main St", "New York", "NY", "10001", "USA"],
  ["Beautiful House", "This is a spacious and luxurious house with modern amenities.", "For Sale", "House", 1000, 200, 4, 3, 2010, 500000, 1631635200],
  ["John Doe", "johndoe@example.com", "+1 (123) 456-7890"],
  ["QmWpN7qkP4P8fJH5gUQeWjJZK8iWm5W8Vn7XsTJ6VZB7zT", "QmU7UKWmLs3tJcDb8G3wT4nJLp4t1sTz7jKsP9QJdZvQ7r"]
]
  




async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL as string)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
  const signer = wallet.connect(provider);
  const PropertyManager = PropertyManager__factory.connect("0x26E914456669C8b6bd51607C45391b8edfDD990a", signer)
  console.log(await PropertyManager.owner())
  const deployProperty = await PropertyManager.createNewProperty(args[0] as any , args[1] as any, args[2]as any, args[3]as any)
  const deployPropertyReceipt = await deployProperty.wait()
  const deployedPropertyAddress = await PropertyManager.properties(0)
  console.log(deployPropertyReceipt.transactionHash)
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })