# Ethereum Contract Interaction Script

This script is responsible for managing roles in smart contracts on the Mumbai testnet.

## Functionality

The script performs the following tasks:

### Wallet and Provider Configuration

A wallet is created using a private key and a connection is established to the Mumbai testnet using ethers.js JsonRpcProvider.

### Contract Connection

The script connects to the TestToken contract using the provided contract address and the signer from the created wallet.

### Role Granting

The script retrieves the MINTER_ROLE of the TestToken contract. It then grants this role to the PropertyManager contract using the `grantRole` function of the TestToken contract.



# Property Contract Interaction

This script handles the interaction with the Property contract on the Mumbai testnet.

## Functionality

The script performs the following tasks:

### Contract Owner Retrieval

The script retrieves the owner of the Property contract and logs the owner's address to the console.

### Property Data Retrieval

The script fetches the property data from the Property contract and logs this data. The specific details included in the property data depend on how the Property contract is designed.

### Image CID Retrieval

The script retrieves the image CID of the Property contract. This CID likely points to images related to the property stored in a decentralized file storage system like IPFS.

# Property Creation Script

This script is used to interact with a `PropertyManager` contract on the Mumbai testnet and deploy a new property.

## Functionality

### Contract Owner Retrieval

The script retrieves and logs the owner of the `PropertyManager` contract.

### Property Creation

The script deploys a new property with predefined arguments, which includes details about:

- Location
- Description
- Status
- Type
- Size
- Owner's contact details
- Image identifiers

### Transaction Receipt and Property Address Retrieval

After deploying the new property, the script waits for the transaction to be mined and retrieves the transaction receipt. It also retrieves the address of the deployed property. However, this part seems to be incomplete since the address is not logged or used further in the script.

### Logging the Transaction Hash

The script logs the transaction hash of the property creation transaction to the console.


