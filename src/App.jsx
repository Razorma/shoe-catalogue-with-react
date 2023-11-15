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
  // const [logInStatus, setLogInStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("CurrentUser"));
  const [userRole, setUserRole] = useState("");
  const [shoesElements, setShoesElements] = useState(null);
  const [userCartItems, setUserCartItems] = useState({
    cartItems: "",
    data: [],
    total: "",
  });
  const [filterData, setFilterData] = useState({
    brand: "",
    color: "",
    size: "",
  });
  const [signUpError, setSignUpError] = useState('');
  const [logInError, setLogInError] = useState('');
  const [trackCart, setTrackCart] = useState(0);
  const [trackAddProduct, setTrackAddProduct] = useState(0);

  const [cartError, setCartError] = useState([]);

  const loginModal = document.querySelector(".loginButtonModal")
 

  const orderCart = document.querySelector(".cart");

 


  //Function open cart
  function openCart() {
    orderCart.style.right = "0";
  }

  useEffect(() => {

 
      async function getShoes(){
      if (filterData.brand && filterData.size && filterData.color) {
        await shoesRequests
          .getShoeByBrandSizeAndColor(
            filterData.brand,
            filterData.size,
            filterData.color
          )
          .then(function (results) {
            let response = results.data;
            let data = response.data;
            setShoesElements(data);
            if (!data) {
              setShoesElements("Out Of Stock");
            }
          });
      } else if (filterData.brand && filterData.size && !filterData.color) {
        
        await shoesRequests
          .getShoeByBrandAndSize(filterData.brand, filterData.size)
          .then(function (results) {
            let response = results.data;
            let data = response.data;
            setShoesElements(data);
            if (!data) {
              setShoesElements("Out Of Stock");
            }
          });
      } else if (filterData.color && filterData.size && !filterData.brand) {
        
        await shoesRequests
          .getShoeBySizeAndColor(filterData.size, filterData.color)
          .then(function (results) {
            let response = results.data;
            let data = response.data;
            setShoesElements(data);
            if (!data) {
              setShoesElements("Out Of Stock");
            }
          });
      } else if (filterData.brand && filterData.color && !filterData.size) {
        
        await shoesRequests
          .getShoeByBrandAndColor(filterData.brand, filterData.color)
          .then(function (results) {
            let response = results.data;
            let data = response.data;
            setShoesElements(data);
            if (!data) {
              setShoesElements("Out Of Stock");
            }
          });
      } else if (filterData.brand && !filterData.size && !filterData.color) {
        
        await shoesRequests.getShoeByBrand(filterData.brand).then(function (results) {
          let response = results.data;
          let data = response.data;
          setShoesElements(data);
          if (!data) {
            setShoesElements("Out Of Stock");
          }
        });
      } else if (!filterData.brand && !filterData.color && filterData.size) {
        
        await shoesRequests.getShoeBySize(filterData.size).then(function (results) {
          let response = results.data;
          let data = response.data;
          setShoesElements(data);
          if (!data) {
            setShoesElements("Out Of Stock");
          }
        });
      } else if (!filterData.brand && filterData.color && !filterData.size) {
        
        await  shoesRequests.getShoeByColor(filterData.color).then(function (results) {
          let response = results.data;
          let data = response.data;
          setShoesElements(data);
          if (!data) {
            setShoesElements("Out Of Stock");
          }
          if (response.error) {
            setShoesElements("Out Of Stock");
          }
        });
        
      } else {
       
        await shoesRequests.getShoes().then((results) => {
          
          let response = results.data;
          let data = response.data;
          setShoesElements(data);
        });
      }

    }
    getShoes()
   

}, [trackCart]);

  return (
    <>
      <Header 
      currentUser={currentUser} 
      setCurrentUser={setCurrentUser} 
      shoesRequests={shoesRequests}
      setTrackAddProduct={setTrackAddProduct}
      />
      {shoesElements?
      <main className="container-fluid mt-5">
        <div className="icon" onClick={openCart}>
          <span className="totalCart">{userCartItems.cartItems?userCartItems.cartItems:""}</span>
          <i className="bi bi-cart3 openCart o mx-2"></i>
        </div>
        <LoginModal
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
        filterData={filterData}
        setFilterData ={setFilterData }
        setTrackCart={setTrackCart}
        setTrackAddProduct={setTrackAddProduct}
        />
        <hr />
        <Cart
          setTrackCart={setTrackCart}
          currentUser={currentUser}
          shoesRequests={shoesRequests}
          setUserCartItems={setUserCartItems}
          userCartItems={userCartItems}
          setTrackAddProduct={setTrackAddProduct}
          trackAddProduct={trackAddProduct}
          setCartError={setCartError}
          cartError={cartError}
          loginModal={loginModal}
        />
       
       <Products
        shoesElements={shoesElements}
        currentUser={currentUser}
        setShoesElements={setShoesElements}
        shoesRequests={shoesRequests}
        loginModal={loginModal}
        setCartError={setCartError}
        setTrackCart={setTrackCart}
        setTrackAddProduct={setTrackAddProduct}
        trackCart={trackCart}
       />
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
