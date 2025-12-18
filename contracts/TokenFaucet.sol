// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract TokenFaucet {
    uint256 public constant FAUCET_AMOUNT = 10 ** 18;
    uint256 public constant COOLDOWN_TIME = 86400;
    uint256 public constant MAX_CLAIM_AMOUNT = 100 * (10 ** 18);
    address public admin;
    address public tokenAddress;
    bool public paused;
    mapping(address => uint256) public lastClaimedAt;
    mapping(address => uint256) public totalClaimed;
    // Events
    event TokensClaimed(address indexed to,uint256 value,uint256 timestamp);
    event FaucetPaused(bool paused);
    constructor(address _tokenAddress){
        admin = msg.sender;
        paused = false;
        tokenAddress = _tokenAddress;
    }

    function requestTokens() public {
        
    }
    function canClaim(address user) public  view returns (bool) {
        
    }
    function remainingAllownce(address user) public view returns (uint256) {
        
    }
    function setPaused(bool _paused) public {
        require(msg.sender == admin ,"Only autharized by Admin");
        paused = _paused;
    }
    function isPaused()  public view returns (bool) {
        return paused;
    }


}