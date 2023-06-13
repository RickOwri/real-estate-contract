// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract SharedStruct {
    struct PropertyAddress {
        string unitNumber;
        string street;
        string city;
        string state;
        string zip;
        string country;
    }
    struct PropertyData {
        string name;
        string description;
        string propertyStatus;
        string propertyType;
        string landSize;
        string pricePerSqft;
        string bedrooms;
        string bathrooms;
        string yearBuilt;
        string lastSoldPrice;
        string lastSoldDate;
    }
    struct PropertyOwnerContact {
        string name;
        string email;
        string phone;
    }
}
