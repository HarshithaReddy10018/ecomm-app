// import React, { useEffect, useState } from "react";

// function Product1() {
//   const [products, setProducts] = useState([]);

//   // Load products from localStorage or API
//   useEffect(() => {
//     const storedProducts = localStorage.getItem("products");
//     if (storedProducts) {
//       setProducts(JSON.parse(storedProducts));
//     } else {
//       fetch("https://dummyjson.com/products")
//         .then((res) => res.json())
//         .then((data) => {
//           setProducts(data.products);
//           localStorage.setItem("products", JSON.stringify(data.products));
//         });
//     }

//     // Update if products change in other tabs
//     const handleStorageChange = (e) => {
//       if (e.key === "products") {
//         setProducts(JSON.parse(e.newValue));
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);

//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//    // ✅ FIXED ADD TO CART WITH QUANTITY
//   const handleAddToCart = (product) => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");

//     if (isLoggedIn === "true") {
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];

//       // 🔎 Check if product already exists
//       const existingItem = cart.find(item => item.id === product.id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         cart.push({
//           ...product,
//           quantity: 1
//         });
//       }

//       localStorage.setItem("cart", JSON.stringify(cart));
//       alert("Product added to cart!");
//       navigate("/cart");
//     } else {
//       alert("Please Login first!");
//       navigate("/login");
//     }
//   };


//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Products</h1>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {products.map((product) => (
//           <div
//             key={product.id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               padding: "10px",
//               textAlign: "center",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             {product.thumbnail ? (
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 style={{ width: "100%", height: "150px", objectFit: "cover" }}
//               />
//             ) : (
//               <div
//                 style={{
//                   width: "100%",
//                   height: "150px",
//                   background: "#f0f0f0",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "#999",
//                 }}
//               >
//                 No Image
//               </div>
//             )}
//             <h3>{product.title}</h3>
//             <p style={{ fontWeight: "bold" }}>${product.price}</p>
//             <p style={{ fontSize: "14px", color: "#555" }}>{product.description}</p>
//           </div>
//         ))}
//          <button onClick={() => handleAddToCart(product)}>
//               Add to Cart
//             </button>
//       </div>
//     </div>
//   );
// }

// export default Product1;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from API
  // useEffect(() => {
  //   fetch("https://dummyjson.com/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data.products);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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

   // Update if products change in other tabs
   const handleStorageChange = (e) => {
     if (e.key === "products") {
       setProducts(JSON.parse(e.newValue));
     }
   };
   window.addEventListener("storage", handleStorageChange);

     return () => window.removeEventListener("storage", handleStorageChange);
  }, []);




  // ✅ FIXED ADD TO CART WITH QUANTITY
  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // 🔎 Check if product already exists
      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
      navigate("/cart");
    } else {
      alert("Please Login first!");
      navigate("/login");
    }
  };

  return (
    <>
      <Header />

      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹ {product.price}</p>

            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Products;
