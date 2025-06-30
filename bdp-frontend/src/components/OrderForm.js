import React, { useState } from "react";
import { ethers } from "ethers";

function OrderForm({ contract, signer }) {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [isBuy, setIsBuy] = useState(true);

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const commitment = ethers.utils.randomBytes(32);
      const pubKeyX = ethers.utils.randomBytes(32);
      const messageHash = ethers.utils.randomBytes(32);
      const signature = ethers.utils.randomBytes(64);

      const tx = await contract.placeOrder(
        ethers.utils.parseUnits(amount, 18),
        ethers.utils.parseUnits(price, 18),
        isBuy,
        commitment,
        pubKeyX,
        messageHash,
        signature
      );
      await tx.wait();
      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <form onSubmit={placeOrder} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Place Order</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Amount (cBTC)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Price (USD)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Order Type</label>
        <select
          value={isBuy}
          onChange={(e) => setIsBuy(e.target.value === "true")}
          className="w-full p-2 bg-gray-700 rounded text-white"
        >
          <option value="true">Buy</option>
          <option value="false">Sell</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
        Place Order
      </button>
    </form>
  );
}

export default OrderForm;