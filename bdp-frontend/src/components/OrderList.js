import React, { useState, useEffect } from "react";

function OrderList({ contract }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderCount = await contract.orderCount();
      const orderList = [];
      for (let i = 1; i <= orderCount; i++) {
        const order = await contract.orders(i);
        orderList.push({ id: i, ...order });
      }
      setOrders(orderList);
    };
    if (contract) fetchOrders();
  }, [contract]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Order Book</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">Order ID</th>
                <th className="p-2">Trader</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount (cBTC)</th>
                <th className="p-2">Price (USD)</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-700">
                  <td className="p-2">{order.id.toString()}</td>
                  <td className="p-2">{order.trader.slice(0, 6)}...</td>
                  <td className="p-2">{order.isBuy ? "Buy" : "Sell"}</td>
                  <td className="p-2">{ethers.utils.formatUnits(order.amount, 18)}</td>
                  <td className="p-2">{ethers.utils.formatUnits(order.price, 18)}</td>
                  <td className="p-2">{order.executed ? "Executed" : "Open"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrderList;