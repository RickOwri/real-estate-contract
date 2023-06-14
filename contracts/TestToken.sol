// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title TestToken
 * @dev A contract representing a test ERC20 token with minting and burning capabilities.
 */
contract TestToken is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    /**
     * @dev Constructor function.
     * Initializes the token with name "TestToken" and symbol "TEST".
     * Grants the DEFAULT_ADMIN_ROLE, MINTER_ROLE, and BURNER_ROLE to the contract deployer.
     */
    constructor() ERC20("TestToken", "TEST") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    /**
     * @dev Mint new tokens.
     * Only callable by addresses with the MINTER_ROLE.
     * @param to The address to mint tokens to.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens.
     * Only callable by addresses with the BURNER_ROLE.
     * @param from The address to burn tokens from.
     * @param amount The amount of tokens to burn.
     */
    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {  
        _burn(from, amount);
    }
}
