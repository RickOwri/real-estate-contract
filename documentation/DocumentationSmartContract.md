# Documentation: Smart Contract Details

## Solidity Contract: Property

The `Property` contract is a representation of a property, encapsulating the property's address, associated data, owner contact information, and image content identifiers (CIDs).

### Inherited Contracts

This contract extends from:

- `SharedStruct` contract: Provides shared structure functionality.
- `Ownable` contract: Furnishes the contract with access control functionality for contract ownership.

### State Variables

- `propertyAddress`: Stores the address details of the property (Type: `PropertyAddress`).
- `propertyData`: Holds associated data of the property (Type: `PropertyData`).
- `propertyOwnerContact`: Contains the contact details of the property owner (Type: `PropertyOwnerContact`).
- `imagesCid`: Maintains content identifiers (CIDs) for the property images as an array of strings.

### Constructor

Initializes the contract using the provided values for `propertyAddress`, `propertyData`, `propertyOwnerContact`, and `imagesCid`.

### Functions

- `updatePropertyAddress`: Modifies the address details of the property.
- `updatePropertyData`: Changes the data associated with the property.
- `updatePropertyOwnerContact`: Alters the contact information of the property owner.
- `updateImagesCid`: Updates the array of content identifiers (CIDs) for the property images.
- `getImagesCid`: Fetches the array of content identifiers (CIDs) for the property images.

---

## Solidity Contract: PropertyManager

`PropertyManager` contract acts as the manager for property-related activities and transactions.

### State Variables

- `i_testToken`: An immutable variable representing the TestToken contract instance.
- `properties`: Stores an array of Property contract instances.
- `fee`: Holds the fee for creating new properties.
- `exchangeRatio`: Retains the exchange ratio of ethers to TestTokens.
- `returnPenalty`: Contains the penalty for returning tokens.
- `minReturnAmount`: Stores the minimum returnable token amount.

### Events

- `PropertyCreated`: Triggered when a new property is created.

### Constructor

Initializes the contract with parameters: `_fee`, `_testToken`, `_exchangeRatio`, `_returnPenalty`, and `_minReturnAmount`.

### Functions

- `createNewProperty`: Facilitates the creation of a new property.
- `purchaseTokens`: Enables the purchase of tokens.
- `returnTokens`: Allows for the return of tokens.
- `updateExchangeRatio`: Modifies the exchange ratio.
- `updateReturnPenalty`: Changes the return penalty.
- `updateMinReturnAmount`: Adjusts the minimum returnable amount.
- `updateFee`: Updates the fee.
- `getProperties`: Returns all properties.
- `withdraw`: Allows the contract owner to withdraw all contract's Ether balance.
- `withdrawToken`: Enables the contract owner to withdraw all contract's TestToken balance.
- `withdrawCustom`: Allows the contract owner to withdraw a specified amount of Ether or a specified ERC20 token.

### Modifiers

- `requireFeesPaid`: Requires fees to be paid before executing a function.

### Fallback Functions

- `fallback`: Allows the contract to receive payments.
- `receive`: Receives Ether directly.

---

## Solidity Contract: SharedStruct

`SharedStruct` is a contract that contains shared structures for property-related data.

- `PropertyAddress`: Contains address details of a property.
- `PropertyData`: Stores various data fields related to a property.
- `PropertyOwnerContact`: Holds contact information of a property owner.

---

## Solidity Contract: TestToken

The `TestToken` contract implements a test ERC20 token with minting and burning capabilities.

- Inherits from `ERC20` contract: Provides standard ERC20 token functionality.
- Inherits from `ERC20Burnable` contract: Allows tokens to be burned (destroyed).
- Inherits from `AccessControl` contract: Enables role-based access control functionality.

Two constant variables are defined:

- `MINTER_ROLE`: The role required to mint (create) new tokens.
- `BURNER_ROLE`: The role required to burn (destroy) tokens.
