# Smart Contract Informations

## Solidity Contract: Property

The `Property` contract represents a property with its address, data, owner contact, and images CID. Here are the key details:

### Inheritance

- Inherits from the `SharedStruct` contract, which provides shared structure functionality.
- Inherits from the `Ownable` contract, which provides access control functionality for contract ownership.

### State Variables

- `propertyAddress`: Represents the address details of the property. (Type: `PropertyAddress`)
- `propertyData`: Represents the fake data associated with the property. (Type: `PropertyData`)
- `propertyOwnerContact`: Represents the contact information of the property owner. (Type: `PropertyOwnerContact`)
- `imagesCid`: Stores content identifiers (CID) for the property images as an array of strings.

### Constructor Function

- Initializes the contract with the provided values for `propertyAddress`, `propertyData`, `propertyOwnerContact`, and `imagesCid`.

### Functions

1. `updatePropertyAddress`

   - Updates the address details of the property.
   - Parameters: `PropertyAddress` (\_propertyAddress)
   - Modifier: `onlyOwner` (can only be called by the contract owner)

2. `updatePropertyData`

   - Updates the data associated with the property.
   - Parameters: `PropertyData` (\_propertyData)
   - Modifier: `onlyOwner` 

3. `updatePropertyOwnerContact`

   - Updates the contact information of the property owner.
   - Parameters: `PropertyOwnerContact` (\_propertyOwnerContact)
   - Modifier: `onlyOwner` 

4. `updateImagesCid`

   - Updates the array of content identifiers (CID) for the property images.
   - Parameters: `string[]` (\_imagesCid)
   - Modifier: `onlyOwner` 

5. `getImagesCid`
   - Retrieves the array of content identifiers (CID) for the property images.
   - Returns: `string[]` containing the images CID.
   - View function (does not modify the contract state) that can be called by anyone.

## Solidity Contract: PropertyManager

The `PropertyManager` contract is responsible for managing properties, token purchases, and token returns. Here are the key details:

### Inheritance

- The contract inherits from the `Ownable` contract, which provides access control functionality.

### State Variables

- `i_testToken`: An immutable reference to the `TestToken` contract.
- `properties`: An array of `Property` contracts representing managed properties.
- `fee`: The fee amount required to create a new property.
- `exchangeRatio`: The exchange ratio of Ether to TestToken.
- `returnPenalty`: The penalty percentage applied when returning tokens.
- `minReturnAmount`: The minimum return amount required when returning tokens.

### Events

- `PropertyCreated`: An event emitted when a new property is created. It includes the property contract address and the owner's address.

### Constructor Function

- Initializes the contract with the provided values for `fee`, `i_testToken`, `exchangeRatio`, `returnPenalty`, and `minReturnAmount`.

### Fallback and Receive Functions

- The contract includes fallback and receive functions to handle Ether payments.

### Modifiers

- `requireFeesPaid`: A modifier that checks if the required fee in TestToken has been transferred before executing a function.

### Functions

- `createNewProperty`: Allows users to create a new property by providing address details, property data, owner contact information, and image content identifiers (CID). It creates a new `Property` contract, adds it to the `properties` array, transfers ownership to the caller, and emits a `PropertyCreated` event.
- `purchaseTokens`: Allows users to purchase tokens by sending Ether. It mints TestToken to the sender based on the provided Ether amount and the exchange ratio.
- `returnTokens`: Allows users to return tokens and receive Ether in return. It requires the returned token amount to exceed the minimum return amount. Tokens are burned from the sender's balance, and Ether is transferred back to the sender after deducting a penalty based on the return penalty percentage.
- `updateExchangeRatio`: Allows the contract owner to update the exchange ratio between Ether and TestToken.
- `updateReturnPenalty`: Allows the contract owner to update the return penalty percentage.
- `updateMinReturnAmount`: Allows the contract owner to update the minimum return amount.
- `updateFee`: Allows the contract owner to update the fee amount.
- `getProperties`: Retrieves the list of managed properties (Property contracts).
- `withdraw`: Allows the contract owner to withdraw the Ether balance from the contract.
- `withdrawToken`: Allows the contract owner to withdraw the TestToken balance from the contract.
- `withdrawCustom`: Allows the contract owner to withdraw a custom amount of Ether or ERC20 tokens.

## Solidity Contract: SharedStruct

The provided Solidity code defines a contract called "SharedStruct" that contains shared structs for property-related data. It includes the following structs:

1. `PropertyAddress`: Represents the address details of a property, including the unit number, street, city, state, zip code, and country.

2. `PropertyData`: Contains various data fields related to a property, such as its name, description, property status, property type, land size, price per square foot, number of bedrooms and bathrooms, year built, last sold price, and last sold date.

3. `PropertyOwnerContact`: Represents the contact information of a property owner, including their name, email address, and phone number.

## Solidity Contract: TestToken

The provided Solidity code represents the "TestToken" contract, which implements a test ERC20 token with minting and burning capabilities:

- The contract inherits from the `ERC20` contract, providing standard ERC20 token functionality.
- It also inherits from the `ERC20Burnable` contract, allowing tokens to be burned (destroyed).
- The `AccessControl` contract is imported and inherited, enabling role-based access control functionality.

The contract defines two constant variables:

- `MINTER_ROLE`: Represents the role required to mint (create) new tokens.
- `BURNER_ROLE`: Represents the role required to burn (destroy) tokens.


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
