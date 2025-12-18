// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/tokem/ERC20/ERC20.sol";

contract Token is ERC20{
    uint256 public constant TOTAL_SUPPLY = 1_000_000 * (10 ** 18);
    address public minter;
    constructor(address faucetAddress) ERC20("Token", "TKN") {
         require(faucetAddress != address(0), "Invalid faucet address");
        minter = faucetAddress;
    }
    function mint(address to , uint256 amount)  external {
        require(msg.sender == minter, "Only minter can mint");
        require(totalSupply() + amount <= TOTAL_SUPPLY, "Exceeds total supply");
        _mint(to, amount);  
        
    }
}