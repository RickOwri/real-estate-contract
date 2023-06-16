// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/TestToken.sol";
import "contracts/SharedStruct.sol";
import "contracts/Property.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title A contract for managing properties
contract PropertyManager is SharedStruct, Ownable {
    TestToken immutable i_testToken; // TestToken contract instance
    Property[] public properties; // Array of Property contract instances
    uint256 public fee; // Fee for creating new properties
    uint256 public exchangeRatio; // Exchange ratio of ethers to TestTokens
    uint256 public returnPenalty; // Penalty for returning tokens
    uint256 public minReturnAmount; // Minimum returnable token amount
    event PropertyCreated(address indexed property, address indexed owner);

    /// @notice Contract constructor initializes with specified parameters
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

    /// @notice Fallback function to allow the contract to receive payments
    fallback() external payable {}

    /// @notice To receive ether directly
    receive() external payable {}

    /// @dev Modifier to require fees paid before executing a function
    modifier requireFeesPaid() {
        require(
            i_testToken.transferFrom(msg.sender, address(this), fee),
            "Fees not paid"
        );
        _;
    }

    /// @notice Creates a new property
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

    /// @notice Allows purchase of tokens
    function purchaseTokens() external payable {
        i_testToken.mint(msg.sender, msg.value * exchangeRatio);
    }

    /// @notice Allows returning tokens
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
        i_testToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(returnAmount);
    }

    /// @notice Updates the exchange ratio
    function updateExchangeRatio(uint256 _exchangeRatio) external onlyOwner {
        exchangeRatio = _exchangeRatio;
    }

    /// @notice Updates the return penalty
    function updateReturnPenalty(uint256 _returnPenalty) external onlyOwner {
        returnPenalty = _returnPenalty;
    }

    /// @notice Updates the minimum returnable amount
    function updateMinReturnAmount(
        uint256 _minReturnAmount
    ) external onlyOwner {
        minReturnAmount = _minReturnAmount;
    }

    /// @notice Updates the fee
    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    /// @notice Returns all properties
    function getProperties() external view returns (Property[] memory) {
        return properties;
    }

    /// @notice Allows contract owner to withdraw all contract's Ether balance
    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    /// @notice Allows contract owner to withdraw all contract's TestToken balance
    function withdrawToken() external onlyOwner {
        i_testToken.transfer(msg.sender, i_testToken.balanceOf(address(this)));
    }

    /// @notice Allows contract owner to withdraw specific amount of either Ether or a specified ERC20 token
    function withdrawCustom(
        uint _amount,
        address _token,
        bool isETH
    ) public onlyOwner {
        if (isETH) {
            _amount > 0
                ? payable(msg.sender).send(_amount)
                : payable(msg.sender).send(address(this).balance);
        } else {
            _amount > 0
                ? IERC20(_token).transfer(msg.sender, _amount)
                : IERC20(_token).transfer(
                    msg.sender,
                    IERC20(_token).balanceOf(address(this))
                );
        }
    }
}
