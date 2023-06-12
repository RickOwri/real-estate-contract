import { ethers } from "hardhat"
import { Property__factory } from "../typechain-types"
import "dotenv/config";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL as string)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
  const signer = wallet.connect(provider);
  const property = Property__factory.connect("0xB2BF1C62829493c331975bb2875843B8AFCCbf47", signer)
  console.log(await property.owner())
  console.log((await property.propertyData()))
  console.log(await property.getImagesCid())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })