// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/TestToken.sol";
import "contracts/SharedStruct.sol";
import "contracts/Property.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title PropertyManager
 * @dev A contract for managing properties, their creation, token purchases, and token returns.
 */
contract PropertyManager is SharedStruct, Ownable {
    TestToken immutable i_testToken;
    Property[] public properties; // Contract addresses of properties
    uint256 public fee;
    uint256 public exchangeRatio;
    uint256 public returnPenalty;
    uint256 public minReturnAmount;
    event PropertyCreated(address indexed property, address indexed owner);

    /**
     * @dev Constructor function
     * @param _fee The fee amount required to create a new property
     * @param _testToken The address of the TestToken contract
     * @param _exchangeRatio The exchange ratio of ETH to TestToken
     * @param _returnPenalty The penalty percentage applied when returning tokens
     * @param _minReturnAmount The minimum return amount required when returning tokens
     */
    constructor(
        uint256 _fee,
        TestToken _testToken,
        uint256 _exchangeRatio,
        uint256 _returnPenalty,
        uint256 _minReturnAmount
    ) {
        fee = _fee;
        i_testToken = _testToken;
        exchangeRatio = _exchangeRatio;
        returnPenalty = _returnPenalty;
        minReturnAmount = _minReturnAmount;
    }

    fallback() external payable {}

    receive() external payable {}

    /**
     * @dev Modifier to require payment of fees
     */
    modifier requireFeesPaid() {
        require(
            i_testToken.transferFrom(msg.sender, address(this), fee),
            "Fees not paid"
        );
        _;
    }

    /**
     * @dev Creates a new property
     * @param _propertyAddress The address details of the property
     * @param _propertyData The data associated with the property
     * @param _propertyOwnerContact The contact information of the property owner
     * @param _imagesCid The array of content identifiers (CID) for the property images
     */
    function createNewProperty(
        PropertyAddress memory _propertyAddress,
        PropertyData memory _propertyData,
        PropertyOwnerContact memory _propertyOwnerContact,
        string[] memory _imagesCid
    ) external requireFeesPaid {
        Property newProperty = new Property(
            _propertyAddress,
            _propertyData,
            _propertyOwnerContact,
            _imagesCid
        );
        properties.push(newProperty);
        newProperty.transferOwnership(msg.sender);
        emit PropertyCreated(address(newProperty), msg.sender);
    }

    /**
     * @dev Allows users to purchase tokens by sending ETH
     */
    function purchaseTokens() external payable {
        i_testToken.mint(msg.sender, msg.value * exchangeRatio);
    }

    /**
     * @dev Allows users to return tokens and receive ETH in return
     * @param amount The amount of tokens to return
     */
    function returnTokens(uint256 amount) external payable {
        require(
            amount > minReturnAmount,
            "Amount must be greater than minReturnAmount"
        );
        require(
            i_testToken.balanceOf(msg.sender) >= amount,
            "Insufficient balance"
        );
        uint256 penaltyAmount = (amount * returnPenalty) / 100;
        uint256 returnAmount = (amount - penaltyAmount) / exchangeRatio;
