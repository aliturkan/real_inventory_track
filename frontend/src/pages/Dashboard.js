import React from "react";

const Dashboard = () => {
  const totalItems = 5;
  const lowStockItems = 2;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f2f2f2" }}>
      <h2>Inventory Dashboard</h2>
      <p>
        <strong>Total Items:</strong> {totalItems}
      </p>
      <p style={{ color: "red" }}>
        <strong>Low Stock Items:</strong> {lowStockItems}
      </p>
    </div>
  );
};

export default Dashboard;
