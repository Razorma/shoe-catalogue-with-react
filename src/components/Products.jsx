import React, { useEffect } from "react";
import shoes from "../apiCalls/requests"
import axios from "axios"
import { addToCart } from "../apiCalls/helperFunctions";
// axios.defaults.withCredentials = true;

const shoesRequests = shoes(axios)


const Products = ({setTrackCart,currentUser,shoe_id,shoe_picture,shoe_name,brand_name,stock, shoe_size,price,loginModal,setCartError}) => {

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
 
    
  return (
        <>
      <div className="shoe-box">
        <img src={shoe_picture} href={shoe_picture} alt="" />
        <div className="shoe-info">
          <span className="nameOfShoe">{shoe_name}</span>
          <span className="Brand">
            {capitalize(brand_name)}
            <span className="Stock">Stock: {stock}</span>
            
          </span>
          
          <span className="Size">Size: {shoe_size}</span>
          <span className="priceOfShoe">R {price}</span>
          <button
            type="submit"
            className="productButton"
            onClick={()=>addToCart(currentUser,shoe_id,shoesRequests,setTrackCart,setCartError)}
          >
            Add<i className="bi bi-cart4"></i>
          </button>
        </div>
      </div>
      </>
    
  );
};

export default Products;
