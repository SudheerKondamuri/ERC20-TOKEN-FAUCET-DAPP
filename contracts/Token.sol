// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20 ,Ownable {
    uint256 public constant TOTAL_SUPPLY = 1_000_000 * (10 ** 18);
    address public minter;


    constructor(
        address _initialOwner
    ) ERC20("Token", "TKN") Ownable(_initialOwner) {
        minter = _initialOwner;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == minter, "Only minter can mint");
        require(totalSupply() + amount <= TOTAL_SUPPLY, "Exceeds total supply");
        _mint(to, amount);
    }

    function setMinter(address _newMinter) external  onlyOwner {
        minter = _newMinter;
    }
}
