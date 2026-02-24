import React, { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  // Load products from localStorage or API
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          localStorage.setItem("products", JSON.stringify(data.products));
        });
    }
  }, []);

  // Add product
  const handleAddProduct = () => {
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const productToAdd = { id, ...newProduct };
    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setNewProduct({ title: "", price: "", description: "" });
  };

  // Delete product
  const handleDelete = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Page</h1>

      <h3>Add Product</h3>
      <input
        placeholder="Title"
        value={newProduct.title}
        onChange={(e) =>
          setNewProduct({ ...newProduct, title: e.target.value })
        }
      />
      <input
        placeholder="Price"
        type="number"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />
      <button onClick={handleAddProduct}>Add Product</button>

      <h3>Products List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
            <button
              onClick={() => handleDelete(product.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
