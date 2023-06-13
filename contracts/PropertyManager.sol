// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/TestToken.sol";
import "contracts/SharedStruct.sol";
import "contracts/Property.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PropertyManager is SharedStruct, Ownable {
    TestToken immutable i_testToken;
    Property[] public properties; //contract address of properties
    uint256 public fee;
    uint256 public exchangeRatio;
    uint256 public returnPenalty;
    uint256 public minReturnAmount;
    event PropertyCreated(address indexed property, address indexed owner);

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

    modifier requireFeesPaid() {
        require(
            i_testToken.transferFrom(msg.sender, address(this), fee),
            "Fees not paid"
        );
        _;
    }

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
        // mapping (PropertyAddress => uint) name; // unit number | buildingnumber | ->property Contract A
        newProperty.transferOwnership(msg.sender);
        emit PropertyCreated(address(newProperty), msg.sender);
    }

    function purchaseTokens() external payable {
        i_testToken.mint(msg.sender, msg.value * exchangeRatio);
    }

    function returnTokens(uint256 amount) external payable {
        require(
            amount > minReturnAmount,
            "Amount must be greater than minReturnAmount"
        );
        // check token balance of user from mapping
        require(
            i_testToken.balanceOf(msg.sender) >= amount,
            "Insufficient balance"
        );
        uint256 penaltyAmount = (amount * returnPenalty) / 100;
        uint256 returnAmount = (amount - penaltyAmount) / exchangeRatio;
        i_testToken.burnFrom(msg.sender, amount); // approve it first
        payable(msg.sender).transfer(returnAmount);
    }

    function updateExchangeRatio(uint256 _exchangeRatio) external onlyOwner {
        exchangeRatio = _exchangeRatio;
    }

    function updateReturnPenalty(uint256 _returnPenalty) external onlyOwner {
        returnPenalty = _returnPenalty;
    }

    function updateMinReturnAmount(
        uint256 _minReturnAmount
    ) external onlyOwner {
        minReturnAmount = _minReturnAmount;
    }

    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function getProperties() external view returns (Property[] memory) {
        return properties;
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawToken() external onlyOwner {
        i_testToken.transfer(msg.sender, i_testToken.balanceOf(address(this)));
    }

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
