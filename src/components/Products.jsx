 import Header from "./Header"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  const handledAddToCart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if(isLoggedIn=="true"){
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

        <div className="card">
          <img src="src\images\mobile1.jpeg" alt="PRODUCT-1" />
          <h3>Samsung A35 5g</h3>
          <p>19,999/-</p>
          <button onClick={handledAddToCart}>Add to Cart</button>
        </div>

        <div className="card">
          <img src="src/images/mobile2.jpeg" alt="PRODUCT-2" />
          <h3>Iqoo Z9x 5g</h3>
          <p>14,999/-</p>
          <button onClick={handledAddToCart}>Add to Cart</button>
        </div>

        <div className="card">
          <img src="src/images/mobile3.jpeg" alt="ROSES" />
          <h3>Redmi 13 5g</h3>
          <p>16,999/-</p>
          <button onClick={handledAddToCart}>Add to Cart</button>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Products