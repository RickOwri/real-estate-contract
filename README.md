# real-estate-contracts

1. Property Contract
Property contract symbolizes a real-world property, encapsulating essential information, namely, the property's address, associated data, owner's contact details, and image content identifiers (CIDs).

It extends from two key contracts:

SharedStruct: Provides necessary property-related data structures.
Ownable: Bestows access control mechanism, defining contract ownership.
The contract comprises four state variables - propertyAddress, propertyData, propertyOwnerContact, and imagesCid, all initialized via the contract constructor. It features methods to update these variables, and to fetch property image CIDs.

2. PropertyManager Contract
PropertyManager serves as the orchestrator for property-related operations, encompassing an array of Property contract instances and associated transactions. It also maintains a TestToken contract instance (i_testToken).

The contract operates on several state variables, which store values pertinent to the properties, their creation, tokens, exchange rates, and penalties. It is initialized with _fee, _testToken, _exchangeRatio, _returnPenalty, and _minReturnAmount.

Key functions include creating properties, purchasing and returning tokens, updating various parameters, fetching all properties, and withdrawing balances. It also incorporates a modifier requireFeesPaid and fallback functions to receive payments.

A noteworthy event PropertyCreated is triggered upon the creation of a new property.

3. SharedStruct Contract
SharedStruct underpins shared structures for property-related data. It specifies three structures: PropertyAddress, PropertyData, and PropertyOwnerContact, containing relevant information about the property's address, data, and owner's contact, respectively.

4. TestToken Contract
TestToken contract, initialized with the name "TestToken" and symbol "TEST", defines MINTER_ROLE and BURNER_ROLE contract variables. The constructor assigns the DEFAULT_ADMIN_ROLE, MINTER_ROLE, and BURNER_ROLE to the contract deployer.

The contract includes the mint and burn functions, accessible only by addresses with respective roles. Role-based access control offered by the AccessControl contract ensures precise control over the minting and burning capabilities of the contract.