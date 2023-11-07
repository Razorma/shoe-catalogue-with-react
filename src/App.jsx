import { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import Products from "./components/products";
import shoes from "./apiCalls/requests";
import axios from "axios";
import Filter from "./components/Filter";
import SignUpModal from "./components/SignUpModal";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const shoesRequests = shoes(axios);

function App() {
  const [logInStatus, setLogInStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [shoesElements, setShoesElements] = useState([]);
  const [userCartItems, setUserCartItems] = useState({
    cartItems: "",
    data: "",
    total: "",
  });

  const orderCart = document.querySelector(".cart");

  //Function to close and open cart
  function openCart() {
    orderCart.style.right = "0";
  }

  useEffect(() => {
    shoesRequests.getShoes().then((results) => {
      const response = results.data.data;
      setShoesElements(response);
    });
  }, []);
  const shoesData = shoesElements.map((shoe) => (
    <Products
      key={shoe.id}
      shoe_picture={shoe.shoe_picture}
      shoe_name={shoe.shoe_name}
      brand_name={shoe.brand_name}
      stock={shoe.stock}
      shoe_size={shoe.shoe_size}
      price={shoe.price}
    />
  ));

  return (
    <>
      <Header logInStatus={logInStatus} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <main className="container-fluid mt-5">
        <div className="icon" onClick={openCart}>
          <span className="totalCart">{userCartItems.cartItems?userCartItems.cartItems:""}</span>
          <i className="bi bi-cart3 openCart o mx-2"></i>
        </div>
        <LoginModal
          setLogInStatus={setLogInStatus}
          setUserRole={setUserRole}
          setCurrentUser={setCurrentUser}
        />
        <SignUpModal />
        <Filter shoesRequests={shoesRequests} setShoesElements={setShoesElements}/>
        <hr />
        <Cart
          currentUser={currentUser}
          shoesRequests={shoesRequests}
          setUserCartItems={setUserCartItems}
          userCartItems={userCartItems}
        />
        <div id="products">{shoesData}</div>
        <hr />
        <Contact/>
        <Footer/>
      </main>
    </>
  );
}

export default App;
