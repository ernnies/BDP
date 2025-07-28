// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract TradingPrivacy {
    // Citrea precompile addresses
    address constant P256R1_VERIFY_PRECOMPILE = 0x0000000000000000000000000000000000000100;
    address constant SCHNORR_VERIFY_PRECOMPILE = 0x0000000000000000000000000000000000000200;

    // Mapping to track private trades
    mapping(address => bool) public isTradePrivate;
    mapping(bytes32 => bool) public tradeExecuted;

    event TradePlaced(address indexed trader, bytes32 tradeId, uint256 timestamp);

    // Struct to hold trade details
    struct Trade {
        address trader;
        uint256 amount;
        uint256 price;
        bool isPrivate;
    }
    mapping(bytes32 => Trade) public trades;

    // Place a trade with privacy via secp256r1 signature
    function placeTrade(
        bytes32 tradeId,
        uint256 amount,
        uint256 price,
        bytes32 messageHash,
        bytes32 r,
        bytes32 s,
        bytes32 pubKeyX,
        bytes32 pubKeyY
    ) external {
        require(tradeExecuted[tradeId] == false, "Trade already executed");
        bytes memory input = abi.encodePacked(messageHash, r, s, pubKeyX, pubKeyY);
        (bool success, bytes memory result) = P256R1_VERIFY_PRECOMPILE.staticcall(input);
        require(success && result.length == 32 && result[31] == 0x01, "Invalid secp256r1 signature");

        trades[tradeId] = Trade(msg.sender, amount, price, true);
        isTradePrivate[msg.sender] = true;
        tradeExecuted[tradeId] = true;

        emit TradePlaced(msg.sender, tradeId, block.timestamp);
    }

    // Verify a trade using Schnorr signature (for additional security)
    function verifySchnorrTrade(
        bytes32 tradeId,
        bytes32 pubKeyX,
        bytes32 messageHash,
        bytes calldata signature
    ) external view returns (bool) {
        require(tradeExecuted[tradeId], "Trade not executed");
        bytes memory input = abi.encodePacked(pubKeyX, messageHash, signature);
        (bool success, bytes memory result) = SCHNORR_VERIFY_PRECOMPILE.staticcall(input);
        return success && result.length == 32 && result[31] == 0x01;
    }
}