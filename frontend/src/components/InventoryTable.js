import React, { useEffect, useState } from "react";
import axios from "axios";
import AddItemForm from "./AddItemForm";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);

  const fetchInventory = () => {
    axios.get("http://localhost:8080/api/inventory").then((res) => {
      setInventory(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleItemAdded = (item) => {
    setInventory((prev) => [...prev, item]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await axios.delete(`http://localhost:8080/api/inventory/${id}`);
      setInventory((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:8080/api/inventory/${editItem.id}`,
      editItem
    );
    setInventory((prev) =>
      prev.map((item) => (item.id === editItem.id ? editItem : item))
    );
    setEditItem(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Inventory List</h3>

      <AddItemForm onItemAdded={handleItemAdded} />

      {editItem && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Edit Item</h4>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="number"
            value={editItem.quantity}
            onChange={(e) =>
              setEditItem({ ...editItem, quantity: parseInt(e.target.value) })
            }
            placeholder="Quantity"
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.name}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.quantity}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryTable;
