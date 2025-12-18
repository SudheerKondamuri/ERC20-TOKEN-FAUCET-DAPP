// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IToken} from "./IToken.sol";

contract TokenFaucet {
    uint256 public constant FAUCET_AMOUNT = 10 ** 18;
    uint256 public constant COOLDOWN_TIME = 86400;
    uint256 public constant MAX_CLAIM_AMOUNT = 100 * (10 ** 18);
    address public admin;
    IToken public token;
    bool public paused;
    mapping(address => uint256) public lastClaimedAt;
    mapping(address => uint256) public totalClaimed;
    // Events
    event TokensClaimed(address indexed to, uint256 value, uint256 timestamp);
    event FaucetPaused(bool paused);

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        admin = msg.sender;
        paused = false;
        token = IToken(_tokenAddress);
    }

    function requestTokens() public {
        require(!paused, "Faucet is paused");

        require(
            block.timestamp >= lastClaimedAt[msg.sender] + COOLDOWN_TIME,
            "Cooldown period not elapsed"
        );

        require(
            totalClaimed[msg.sender] + FAUCET_AMOUNT <= MAX_CLAIM_AMOUNT,
            "Lifetime claim limit reached"
        );

        lastClaimedAt[msg.sender] = block.timestamp;
        totalClaimed[msg.sender] += FAUCET_AMOUNT;

        token.mint(msg.sender, FAUCET_AMOUNT);

        emit TokensClaimed(msg.sender, FAUCET_AMOUNT, block.timestamp);
    }

    function canClaim(address user) public view returns (bool) {
        if (paused) return false;
        if (block.timestamp < lastClaimedAt[user] + COOLDOWN_TIME) return false;
        if (totalClaimed[user] + FAUCET_AMOUNT > MAX_CLAIM_AMOUNT) return false;
        return true;
    }

    function remainingAllowance(address user) public view returns (uint256) {
        return MAX_CLAIM_AMOUNT - totalClaimed[user];
    }

    function setPaused(bool _paused) public {
        require(msg.sender == admin, "Only autharized by Admin");
        paused = _paused;
        emit FaucetPaused(_paused);
    }

    function isPaused() public view returns (bool) {
        return paused;
    }
}
