# Documentation Overview

## Contract Deployment Procedure

The provided TypeScript script specifies a function, `deployProperty`, responsible for deploying the Property contract. This function accepts a single `hre` argument representing the HardhatRuntimeEnvironment object.

`deployProperty` orchestrates the deployment of a "TestToken" contract utilizing the `deploy` method, which includes identifying the deployer account, initializing with empty constructor arguments, and specifying the block confirmations to await.

Subsequent to deployment, the function reveals the `TestToken` contract's deployment address. If not working on a development network, it also confirms the deployed contract on Etherscan.

As the entry point for the Property contract deployment, `deployProperty` can be invoked using the appropriate deployment commands or scripts. This code emphasizes deployment, offering customization and adaptability in deploying the Property contract, integrating with the Hardhat framework, and utilizing the provided runtime environment for deployment operations.

## Deployment of PropertyManager Smart Contract

The given script is purposed for deploying the PropertyManager smart contract via Hardhat, a widely utilized Ethereum development environment.

### Parameters for Smart Contract

- **FEE**: An amount levied for creating new properties (denoted in ethers).
- **TEST_TOKEN_ADDRESS**: The address linked to the TestToken contract.
- **EXCHANGE_RATIO**: The conversion rate from ethers to TestTokens for transactions.
- **RETURN_PENALTY**: The penalty percentage applied when tokens are returned.
- **MIN_RETURN_AMOUNT**: The minimum count of tokens eligible for return.

### Deployment Function

`deployProperty` functions as the deployer for the PropertyManager smart contract. It extracts essential elements from the Hardhat runtime environment, including the chain ID and deployer's account.

#### Input Parameters

The inputs for the PropertyManager contract constructor are established using predefined constants.

#### Deployment Progress

The function logs the commencement of the deployment procedure and initiates the PropertyManager contract deployment with the given arguments. Upon successful deployment, it logs the contract's address.

#### Contract Verification

Provided that the function is not running on a development chain and an Etherscan API key is available, the function also authenticates the contract on Etherscan.

#### Function Export and Tagging

Lastly, the deploy function is tagged for convenient reference and exported for use in different modules.

## Procedure for Deploying the Property Contract

Within the provided script, the `deployProperty` function is defined to enable deployment of a smart contract, named `Property`, on an Ethereum network.

### Account for Deployer

The `getNamedAccounts` function, extracted from the Hardhat Runtime Environment, retrieves the account deploying the `Property` contract.

### Parameters for Contract

The function compiles the necessary inputs to initialize the `Property` contract. These inputs represent:

- The property's address
- Property-specific data
- Contact details of the property owner
- Identifiers for images related to the property

### Deployment and Logging 

The function logs the deployment procedure before using the `deploy` function to initiate the `Property` contract deployment with the defined inputs and deployer account. It waits for a specified number of block confirmations before progressing. If the deployment is successful, the function logs the Ethereum address housing the deployed `Property` contract.

### Verification via Etherscan

Assuming that the deployment is not on a development chain and an Etherscan API key is present, the `Property` contract's deployment is authenticated on Etherscan.

### Function Export

Finally, the `deployProperty` function, tagged with "all" and "property", is exported for utilization in other scripts.
