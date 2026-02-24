 import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const name = localStorage.getItem("username");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <header>
      <h1>🏬 MyShop </h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <div id="user-display">
        {name && (
          <>
            Welcome, {name} |
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                padding: "5px 10px",
                borderRadius:"10px"
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
