import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ onItemAdded }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/inventory", {
        name,
        quantity: parseInt(quantity),
      });

      onItemAdded(response.data); // callback to update list
      setName("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h4>Add New Item</h4>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
