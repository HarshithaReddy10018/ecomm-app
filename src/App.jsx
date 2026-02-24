 import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Product1 from "./components/Product1";
import Login  from "./components/Login";


import Cart from "./components/Cart";
import "./components/styles.css";
import AdminPage from "./components/Admin";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
