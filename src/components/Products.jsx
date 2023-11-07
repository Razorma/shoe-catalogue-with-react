import React, { useEffect } from "react";
import shoes from "../apiCalls/requests"
import axios from "axios"

const shoesRequests = shoes(axios)


const Products = ({shoe_picture,shoe_name,brand_name,stock, shoe_size,price}) => {

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
            // onClick="addToCart({{id}})"
          >
            Add<i className="bi bi-cart4"></i>
          </button>
        </div>
      </div>
      </>
    
  );
};

export default Products;
