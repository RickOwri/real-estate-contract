# Script Documentation

## Script Deployment

The TypeScript code defines a function named `deployProperty` that handles the deployment of the Property contract. This function takes a single parameter `hre`, which represents the HardhatRuntimeEnvironment object.

Within the `deployProperty` function, it deploys a contract named "TestToken" using the `deploy` method. The deployment includes specifying the deployer account, empty constructor arguments, and the number of block confirmations to wait for.

After the deployment, the function logs the deployment address of the `TestToken` contract. It also verifies the deployed contract on Etherscan if the network is not a development network.

The `deployProperty` function serves as an entry point for deploying the Property contract and can be executed using appropriate deployment commands or scripts.

The code focuses on the deployment aspect, allowing for customization and flexibility in deploying the Property contract. It integrates with the Hardhat framework and leverages the provided runtime environment for deployment operations.

## PropertyManager Smart Contract Deployment

The script provided is designed to deploy the PropertyManager smart contract using Hardhat, a popular development environment for Ethereum.

### Smart Contract Parameters

- **FEE**: A fee for creating new properties (expressed in ethers).
- **TEST_TOKEN_ADDRESS**: The address of the TestToken contract.
- **EXCHANGE_RATIO**: The ratio of ethers to TestTokens for exchanges.
- **RETURN_PENALTY**: The penalty percentage for returning tokens.
- **MIN_RETURN_AMOUNT**: The minimum number of tokens that can be returned.

### Deploy Function

`deployProperty` is the deploy function for the PropertyManager smart contract. It retrieves the necessary components from the Hardhat runtime environment including the deployer's account and the network's chain ID.

#### Arguments

The arguments for the PropertyManager contract constructor are set using the predefined constants.

#### Deployment Process

The function logs the start of the deployment process and deploys the PropertyManager contract with the specified arguments. Once deployed, it logs the contract's address.

#### Verification

If not on a development chain and an Etherscan API key is present, the function also verifies the contract on Etherscan.

#### Export and Tags

Finally, the deploy function is exported for use in other modules and tagged for easy reference.

## Deploying the Property Contract

In the given script, the function `deployProperty` is defined to deploy a smart contract, named `Property`, on an Ethereum network.

### Deployer Account

The account that will deploy the `Property` contract is retrieved using the `getNamedAccounts` function from the Hardhat Runtime Environment.

### Contract Arguments

The function prepares the arguments necessary to initialize the `Property` contract. These arguments include arrays that represent:

- The address of the property
- Data about the property
- The property owner's contact details
- Content identifiers for images associated with the property

### Deploying and Logging

The function logs its deployment process and then uses the `deploy` function to deploy the `Property` contract with the defined arguments and deployer account. It waits for a certain number of block confirmations before proceeding. Upon successful deployment, it logs the Ethereum address where the `Property` contract is deployed.

### Etherscan Verification

If the deployment isn't on a development chain and an Etherscan API key is available, the `Property` contract deployment is verified on Etherscan.

### Exporting the Function

Finally, the `deployProperty` function is tagged with "all" and "property" and is exported for use in other scripts.