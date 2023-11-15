import React, { useEffect } from "react";
import shoes from "../apiCalls/requests"
// import axios from "axios"
import { addToCart } from "../apiCalls/helperFunctions";
// axios.defaults.withCredentials = true;

// const shoesRequests = shoes(axios)

//{setTrackCart,currentUser,shoe_id,shoe_picture,shoe_name,brand_name,stock, shoe_size,price,loginModal,setCartError}
const Products = ({shoesElements,currentUser,setShoesElements,shoesRequests,loginModal,setCartError,setTrackCart,setTrackAddProduct, trackCart}) => {

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  //   useEffect(() => {
  //     async function getShoes(){
  //       await shoesRequests.getShoes().then((results) => {
  //         const response = results.data.data;
  //         setShoesElements(response);
  //         // setTrackAddProduct((prev)=>prev+1)
  //       });
  //       //setTrackAddProduct((prevTrack)=>prevTrack+1)
  //     }
  //     getShoes()
     
  //   // }, []);
  // }, [trackCart]);


  let shoesData = []
 

  if (!shoesElements) {
    shoesData = [];
  }else if (typeof shoesElements === "string") {
    shoesData = (<div className="text-center text-danger">Out of stock</div>);
  } else if (shoesElements.length === 1) {
    for (let shoe of shoesElements)
    shoesData = (
      <div className="shoe-box" key={shoe.id}>
      <img src={shoe.shoe_picture} href={shoe.shoe_picture} alt="" />
      <div className="shoe-info">
        <span className="nameOfShoe">{shoe.shoe_name}</span>
        <span className="Brand">
          {capitalize(shoe.brand_name)}
          <span className="Stock">Stock: {shoe.stock}</span>
          
        </span>
        
        <span className="Size">Size: {shoe.shoe_size}</span>
        <span className="priceOfShoe">R {shoe.price}</span>
        <button
          type="submit"
          className="productButton"
          onClick={()=>addToCart(setTrackAddProduct,loginModal,currentUser,shoe.id,setTrackCart,setCartError)}
        >
          Add<i className="bi bi-cart4"></i>
        </button>
      </div>
    </div>
        // <Products
        // key={shoe.id}
        // shoe_id={shoe.id}
        // shoe_picture={shoe.shoe_picture}
        // shoe_name={shoe.shoe_name}
        // brand_name={shoe.brand_name}
        // stock={shoe.stock}
        // shoe_size={shoe.shoe_size}
        // price={shoe.price}
        // loginModal={loginModal}
        // setCartError={setCartError}
        // setTrackCart={setTrackCart}
      // />
      );
  } else {
   shoesData = shoesElements.map((shoe) => (
    <div className="shoe-box" key={shoe.id}>
      <img src={shoe.shoe_picture} href={shoe.shoe_picture} alt="" />
      <div className="shoe-info">
        <span className="nameOfShoe">{shoe.shoe_name}</span>
        <span className="Brand">
          {capitalize(shoe.brand_name)}
          <span className="Stock">Stock: {shoe.stock}</span>
          
        </span>
        
        <span className="Size">Size: {shoe.shoe_size}</span>
        <span className="priceOfShoe">R {shoe.price}</span>
        <button
          type="submit"
          className="productButton"
          onClick={()=>addToCart(setTrackAddProduct,loginModal,currentUser,shoe.id,setTrackCart,setCartError)}
        >
          Add<i className="bi bi-cart4"></i>
        </button>
      </div>
    </div>
      // <Products
      // currentUser={currentUser}
      //   key={shoe.id}
      //   shoe_id={shoe.id}
      //   shoe_picture={shoe.shoe_picture}
      //   shoe_name={shoe.shoe_name}
      //   brand_name={shoe.brand_name}
      //   stock={shoe.stock}
      //   shoe_size={shoe.shoe_size}
      //   price={shoe.price}
      //   loginModal={loginModal}
      //   setCartError={setCartError}
      //   setTrackCart={setTrackCart}
      // />
    ));
  }
  
  return (
        <>
        <div id="products" >{shoesData}</div>
      
      </>
    
  );
};

export default Products;
