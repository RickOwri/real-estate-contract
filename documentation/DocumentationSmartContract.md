# Documentation: Smart Contract Details

## Imported package

- `./SharedStruct.sol`;
- `@openzeppelin/contracts/access/Ownable.sol`;

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

### Imported package

- `@openzeppelin/contracts/access/Ownable.sol`;
- `contracts/TestToken.sol`;
- `contracts/SharedStruct.sol`;
- `contracts/Property.sol`;
- `@openzeppelin/contracts/token/ERC20/IERC20.sol`;

`PropertyManager` contract acts as the manager for property-related activities and transactions.

### Inherited Contracts

This contract extends from:

- `SharedStruct` contract: Provides shared structure functionality.
- `Ownable` contract: Furnishes the contract with access control functionality for contract ownership.

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

This contract defines shared data structures for property details.

### PropertyAddress Struct

Represents the address details of a property.

#### Properties

- `unitNumber` (string): The unit number of the property.
- `street` (string): The street name of the property.
- `city` (string): The city where the property is located.
- `state` (string): The state where the property is located.
- `zip` (string): The zip code of the property.
- `country` (string): The country where the property is located.

### PropertyData Struct

Represents the data associated with a property.

#### Properties

- `name` (string): The name of the property.
- `description` (string): A description of the property.
- `propertyStatus` (string): The status of the property.
- `propertyType` (string): The type of the property.
- `landSize` (string): The size of the land associated with the property.
- `pricePerSqft` (string): The price per square foot of the property.
- `bedrooms` (string): The number of bedrooms in the property.
- `bathrooms` (string): The number of bathrooms in the property.
- `yearBuilt` (string): The year the property was built.
- `lastSoldPrice` (string): The price at which the property was last sold.
- `lastSoldDate` (string): The date when the property was last sold.

### PropertyOwnerContact Struct

Represents the contact information of a property owner.

#### Properties

- `name` (string): The name of the property owner.
- `email` (string): The email address of the property owner.
- `phone` (string): The phone number of the property owner.

---

# TestToken Contract

## Imported Contract:

- `@openzeppelin/contracts/token/ERC20/ERC20.sol`
- `@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol`
- `@openzeppelin/contracts/access/AccessControl.sol`

### Contract Variables

- `DEFAULT_ADMIN_ROLE`: The default admin role assigned to the contract deployer.
- `MINTER_ROLE`: The role required to mint new tokens.
- `BURNER_ROLE`: The role required to burn tokens.

### Inheritance

- `ERC20`
- `ERC20Burnable`
- `AccessControl`

### Constructor

The constructor initializes the TestToken with the name `TestToken` and symbol `TEST`. It grants the DEFAULT_ADMIN_ROLE, MINTER_ROLE, and BURNER_ROLE to the contract deployer.

### Public Functions

- `mint(address to, uint256 amount)`: Only callable by addresses with the MINTER_ROLE.

  - Parameters:
    - `to`: The address to mint tokens to.
    - `amount`: The amount of tokens to mint.

- `burn(address from, uint256 amount)`:Only callable by addresses with the BURNER_ROLE.
  - Parameters:
    - `from`: The address to burn tokens from.
    - `amount`: The amount of tokens to burn.



