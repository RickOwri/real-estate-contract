# Ethereum and Property Contract Interaction Scripts

These scripts are designed to manage roles in smart contracts and interact with property contracts on the Mumbai testnet.

## General Functionality

Each script follows a general process:

1. **Wallet and Provider Configuration:** Establish a connection to the Mumbai testnet using ethers.js JsonRpcProvider and create a wallet using a private key.

2. **Contract Connection:** Connect to the relevant smart contract using the provided contract address and the signer from the created wallet.

3. **Contract Interaction:** Depending on the purpose of the script, it will then perform different tasks related to the connected contract.

## Ethereum Contract Interaction Script

### Role Granting

This script connects to the `TestToken` contract and manages roles. Specifically, it retrieves the `MINTER_ROLE` of the `TestToken` contract and grants this role to the `PropertyManager` contract using the `grantRole` function.

## Property Contract Interaction Script

### Data Retrieval

This script connects to the `Property` contract and retrieves and logs specific data, which includes:

- The contract owner's address.
- The property data (The specific details included in the property data depend on the `Property` contract's design).
- The image CID (points to images related to the property stored in a decentralized file storage system like IPFS).

## Property Creation Scripts

These scripts interact with a `PropertyManager` contract and perform the following:

### Owner Retrieval and Property Creation

They retrieve and log the owner of the `PropertyManager` contract. Then, they deploy a new property with predefined arguments, including details about location, description, status, type, size, owner's contact details, and image identifiers.

### Transaction Receipt, Property Address Retrieval, and Transaction Hash Logging

After deploying the new property, the scripts wait for the transaction to be mined and retrieve the transaction receipt. They also retrieve the address of the deployed property but it seems to be incomplete since the address is not logged or used further in the script. Finally, they log the transaction hash of the property creation transaction to the console.