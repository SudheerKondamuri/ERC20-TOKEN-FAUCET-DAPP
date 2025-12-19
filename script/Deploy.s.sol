// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/Token.sol";
import "../contracts/TokenFaucet.sol";

contract Deploy is Script {
    function run() external {
        // Load deployer private key from env
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy Token
        Token token = new Token(deployer);

        // 2. Deploy Faucet with token address
        TokenFaucet faucet = new TokenFaucet(address(token));

        // 3. Grant minting permission to faucet
        token.setMinter(address(faucet));

        vm.stopBroadcast();

        // 4. Log addresses (console output)
        console2.log("TOKEN_ADDRESS:", address(token));
        console2.log("FAUCET_ADDRESS:", address(faucet));
    }
}
