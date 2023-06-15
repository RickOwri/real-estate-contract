// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./SharedStruct.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Property
 * @dev A contract representing a property with its address, data, owner contact, and images CID.
 */
contract Property is SharedStruct, Ownable {
    PropertyAddress public propertyAddress;
    PropertyData public propertyData;
    PropertyOwnerContact public propertyOwnerContact;
  +[] public imagesCid   string

    /**
     * @dev Constructor function
     * @param _propertyAddress The address details of the property
     * @param _propertyData The data associated with the property
     * @param _propertyOwnerContact The contact information of the property owner
     * @param _imagesCid The array of content identifiers (CID) for the property images
     */
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

    /**
     * @dev Updates the address details of the property
     * @param _propertyAddress The new address details of the property
     */
    function updatePropertyAddress(PropertyAddress memory _propertyAddress) external onlyOwner {
        propertyAddress = _propertyAddress;
    }

    /**
     * @dev Updates the data associated with the property
     * @param _propertyData The new data associated with the property
     */
    function updatePropertyData(PropertyData memory _propertyData) external onlyOwner {
        propertyData = _propertyData;
    }

    /**
     * @dev Updates the contact information of the property owner
     * @param _propertyOwnerContact The new contact information of the property owner
     */
    function updatePropertyOwnerContact(PropertyOwnerContact memory _propertyOwnerContact) external onlyOwner {
        propertyOwnerContact = _propertyOwnerContact;
    }

    /**
     * @dev Updates the array of content identifiers (CID) for the property images
     * @param _imagesCid The new array of content identifiers (CID)
     */
    function updateImagesCid(string[] memory _imagesCid) external onlyOwner {
        imagesCid = _imagesCid;
    }

    /**
     * @dev Retrieves the array of content identifiers (CID) for the property images
     * @return The array of content identifiers (CID) for the property images
     */
    function getImagesCid() external view returns (string[] memory) {
        return imagesCid;
    }
}
