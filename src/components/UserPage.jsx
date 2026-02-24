import React, { useEffect, useState } from "react";

function UserPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const localProducts = localStorage.getItem("products");
    if (localProducts) {
      setProducts(JSON.parse(localProducts));
    } else {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Page</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;
