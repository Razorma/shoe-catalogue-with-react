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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

axios.defaults.withCredentials = true;

const shoesRequests = shoes(axios);

function App() {
  const [logInStatus, setLogInStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("CurrentUser"));
  const [userRole, setUserRole] = useState("");
  const [shoesElements, setShoesElements] = useState(null);
  const [userCartItems, setUserCartItems] = useState({
    cartItems: "",
    data: [],
    total: "",
  });
  const [signUpError, setSignUpError] = useState('');
  const [logInError, setLogInError] = useState('');
  const [trackCart, setTrackCart] = useState(0);
  const [trackAddProduct, setTrackAddProduct] = useState(0);

  const [cartError, setCartError] = useState([]);

  const loginModal = document.querySelector(".loginButtonModal")
 

  const orderCart = document.querySelector(".cart");

  function showCart(){
    shoesRequests.getCart(currentUser).then((results) => {
      const response = results.data;
      if (response.error) {
        console.log(response.error)
      }
      setUserCartItems({
        cartItems: response.cartItems,
        data: response.data,
        total: response.total,
      });
    })

  }

  //Function open cart
  function openCart() {
    orderCart.style.right = "0";
  }

  
  useEffect(() => {
    shoesRequests.getShoes().then((results) => {
      const response = results.data.data;
      setShoesElements(response);
       setTrackAddProduct((prev)=>prev+1)
    });
  }, [trackCart]);

  let shoesData = []
 

  if (!shoesElements) {
    shoesData = [];
  }else if (typeof shoesElements === "string") {
    shoesData = (<div className="text-center text-danger">Out of stock</div>);
  } else if (shoesElements.length === 1) {
    for (let shoe of shoesElements)
    shoesData = (
        <Products
        key={shoe.id}
        shoe_id={shoe.id}
        shoe_picture={shoe.shoe_picture}
        shoe_name={shoe.shoe_name}
        brand_name={shoe.brand_name}
        stock={shoe.stock}
        shoe_size={shoe.shoe_size}
        price={shoe.price}
        loginModal={loginModal}
        setCartError={setCartError}
        setTrackCart={setTrackCart}
      />
      );
  } else {
   shoesData = shoesElements.map((shoe) => (
      <Products
      currentUser={currentUser}
        key={shoe.id}
        shoe_id={shoe.id}
        shoe_picture={shoe.shoe_picture}
        shoe_name={shoe.shoe_name}
        brand_name={shoe.brand_name}
        stock={shoe.stock}
        shoe_size={shoe.shoe_size}
        price={shoe.price}
        loginModal={loginModal}
        setCartError={setCartError}
        setTrackCart={setTrackCart}
      />
    ));
  }
  
  return (
    <>
      <Header 
      logInStatus={logInStatus} 
      currentUser={currentUser} 
      setCurrentUser={setCurrentUser} 
      shoesRequests={shoesRequests}
      setLogInStatus={setLogInStatus}
      setTrackAddProduct={setTrackAddProduct}
      />
      {shoesElements?
      <main className="container-fluid mt-5">
        <div className="icon" onClick={openCart}>
          <span className="totalCart">{userCartItems.cartItems?userCartItems.cartItems:""}</span>
          <i className="bi bi-cart3 openCart o mx-2"></i>
        </div>
        <LoginModal
          setLogInStatus={setLogInStatus}
          setUserRole={setUserRole}
          setCurrentUser={setCurrentUser}
          logInError={logInError}
          setLogInError={setLogInError}
        />
        <SignUpModal 
        shoesRequests={shoesRequests}
        signUpError={signUpError}
        setSignUpError={setSignUpError}
        />
        <Filter 
        shoesRequests={shoesRequests} 
        setShoesElements={setShoesElements}
        />
        <hr />
        <Cart
          currentUser={currentUser}
          shoesRequests={shoesRequests}
          setUserCartItems={setUserCartItems}
          userCartItems={userCartItems}
          setTrackCart={setTrackCart}
          trackCart={trackCart}
          trackAddProduct={trackAddProduct}
          setTrackAddProduct={setTrackAddProduct}
          setCartError={setCartError}
          cartError={cartError}
        />
       <div id="products" >{shoesData}</div>
        <hr />
        <Contact/>
        <Footer/>
      </main>:
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
      }
    </>
  );
}

export default App;
