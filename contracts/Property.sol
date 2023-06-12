// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./SharedStruct.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Property is SharedStruct, Ownable {
    PropertyAddress public propertyAddress;
    PropertyData public propertyData;
    PropertyOwnerContact public propertyOwnerContact;
    string[] public imagesCid;
    constructor(
        PropertyAddress memory _propertyAddress,
        PropertyData memory _propertyData,
        PropertyOwnerContact memory _propertyOwnerContact,
        string[] memory _imagesCid
    ) {
        propertyAddress = _propertyAddress;
        propertyData = _propertyData;
        propertyOwnerContact = _propertyOwnerContact;
        imagesCid = _imagesCid;
    }

    function updatePropertyAddress(
        PropertyAddress memory _propertyAddress
    ) external onlyOwner {
        propertyAddress = _propertyAddress;
    }

    function updatePropertyData(
        PropertyData memory _propertyData
    ) external onlyOwner {
        propertyData = _propertyData;
    }

    function updatePropertyOwnerContact(
        PropertyOwnerContact memory _propertyOwnerContact
    ) external onlyOwner {
        propertyOwnerContact = _propertyOwnerContact;
    }

    function updateImagesCid(
        string[] memory _imagesCid
    ) external onlyOwner {
        imagesCid = _imagesCid;
    }

    function getImagesCid() external view returns (string[] memory) {
        return imagesCid;
    }
}

