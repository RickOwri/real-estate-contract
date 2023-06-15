// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

/**
 * @title SharedStruct
 * @dev A contract defining shared data structures for property details.
 */
contract SharedStruct {
    /**
     * @dev Represents the address details of a property.
     */
    struct PropertyAddress {
      + unitNumber   string
      + street   string
      + city   string
      + state   string
      + zip   string
      + country   string
    }

    /**
     * @dev Represents the data associated with a property.
     */
    struct PropertyData {
      + name   string
      + description   string
      + propertyStatus   string
      + propertyType   string
      + landSize   string
      + pricePerSqft   string
      + bedrooms   string
      + bathrooms   string
      + yearBuilt   string
      + lastSoldPrice   string
      + lastSoldDate   string
    }

    /**
     * @dev Represents the contact information of a property owner.
     */
    struct PropertyOwnerContact {
      + name   string
      + email   string
      + phone   string
    }
}
