// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract BDP {
    address constant SCHNORR_VERIFY_PRECOMPILE = 0x0000000000000000000000000000000000000200;

    struct Order {
        address trader;
        uint256 amount; // cBTC amount (in wei)
        uint256 price; // Price in USD (or stablecoin equivalent)
        bool isBuy; // Buy or sell order
        bytes32 commitment; // ZK commitment of order details
        bytes signature; // Schnorr signature
        bool executed;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;
    address public owner;

    event OrderPlaced(uint256 orderId, address trader, bool isBuy, uint256 amount, uint256 price);
    event OrderMatched(uint256 buyOrderId, uint256 sellOrderId, uint256 amount, uint256 price);
    event OrderSettled(uint256 orderId, address trader);

    constructor() {
        owner = msg.sender;
    }

    function placeOrder(
        uint256 amount,
        uint256 price,
        bool isBuy,
        bytes32 commitment,
        bytes32 pubKeyX,
        bytes32 messageHash,
        bytes calldata signature
    ) external returns (uint256) {
        require(signature.length == 64, "Invalid signature length");
        require(verifySchnorr(pubKeyX, messageHash, signature), "Invalid Schnorr signature");

        orderCount++;
        orders[orderCount] = Order({
            trader: msg.sender,
            amount: amount,
            price: price,
            isBuy: isBuy,
            commitment: commitment,
            signature: signature,
            executed: false
        });

        emit OrderPlaced(orderCount, msg.sender, isBuy, amount, price);
        return orderCount;
    }

    function matchOrders(uint256 buyOrderId, uint256 sellOrderId) external {
        require(msg.sender == owner, "Only owner can match orders");
        Order storage buyOrder = orders[buyOrderId];
        Order storage sellOrder = orders[sellOrderId];

        require(!buyOrder.executed && !sellOrder.executed, "Order already executed");
        require(buyOrder.isBuy && !sellOrder.isBuy, "Invalid order types");
        require(buyOrder.amount == sellOrder.amount, "Amount mismatch");
        require(buyOrder.price == sellOrder.price, "Price mismatch");

        require(buyOrder.commitment != bytes32(0) && sellOrder.commitment != bytes32(0), "Invalid commitment");

        buyOrder.executed = true;
        sellOrder.executed = true;

        emit OrderMatched(buyOrderId, sellOrderId, buyOrder.amount, buyOrder.price);
        emit OrderSettled(buyOrderId, buyOrder.trader);
        emit OrderSettled(sellOrderId, sellOrder.trader);
    }

    function verifySchnorr(
        bytes32 pubKeyX,
        bytes32 messageHash,
        bytes calldata signature
    ) internal view returns (bool) {
        bytes memory input = abi.encodePacked(pubKeyX, messageHash, signature);
        (bool ok, bytes memory output) = SCHNORR_VERIFY_PRECOMPILE.staticcall(input);
        return ok && output.length == 32 && output[31] == 0x01;
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}