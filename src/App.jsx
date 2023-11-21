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
import Admin from "./components/Admin";
import AddShoe from "./components/AddShoe";

axios.defaults.withCredentials = true;

const shoesRequests = shoes(axios);

function App() {
  // const [logInStatus, setLogInStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("CurrentUser"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [shoesElements, setShoesElements] = useState(null);
  const [userCartItems, setUserCartItems] = useState({
    cartItems: "",
    data: [],
    total: "",
  });
  const [adminOrderItems, setAdminOrderItems] = useState({
    cartItems: "",
    data: [],
    total: "",
  })
  
  const [filterData, setFilterData] = useState({
    brand: "",
    color: "",
    size: "",
  });
  const [signUpError, setSignUpError] = useState('');
  const [logInError, setLogInError] = useState('');
  const [trackCart, setTrackCart] = useState(0);
  const [trackAddProduct, setTrackAddProduct] = useState(0);
  const [trackOrders, setTrackOrders] = useState(0);

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

useEffect(() => {

  async function getOrders() {

    await shoesRequests.getOrders().then((results) => {
      const response = results.data;
      if (response.error) {
        console.error(response.error)
      }
      setAdminOrderItems({
        cartItems: response.cartItems,
        data: response.data,
        total: response.total,
      });
    });
  }

  if (userRole) {
      getOrders();
  } 

}, [trackOrders]);

  return (
    <>
      <Header 
      currentUser={currentUser} 
      setCurrentUser={setCurrentUser} 
      shoesRequests={shoesRequests}
      setTrackAddProduct={setTrackAddProduct}
      userRole={userRole}
      />
      
      {shoesElements?
      <main className="container-fluid mt-5">
        {!userRole&&<div className="icon" onClick={openCart}>
          <span className="totalCart">{userCartItems.cartItems?userCartItems.cartItems:""}</span>
          <i className="bi bi-cart3 openCart o mx-2"></i>
        </div>}
        {userRole && 
      <i 
      className="bi bi-database-fill-gear" 
      data-bs-toggle="offcanvas" 
      data-bs-target="#addShoesToCatalogue"
      aria-controls="addShoesToCatalogue"
      > <span></span> Add Shoe</i>
       }
        {userRole && <AddShoe
        loginModal={loginModal}
        />}
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
        {!userRole&&<Filter 
        filterData={filterData}
        setFilterData ={setFilterData }
        setTrackCart={setTrackCart}
        setTrackAddProduct={setTrackAddProduct}
        />}
        <hr />
        {!userRole&&<Cart
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
        />}
       
       {!userRole&&
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
       }
      
      {userRole&& 
      <Admin 
      adminOrderItems={adminOrderItems}
      setTrackOrders={setTrackOrders}
      />
      }
        <hr />
        {!userRole&&<Contact/>}
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
