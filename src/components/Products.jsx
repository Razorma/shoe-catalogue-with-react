import React, { useEffect } from "react";
import { addToCart } from "../apiCalls/helperFunctions";

const Products = ({
  shoesElements,
  currentUser,
  setShoesElements,
  shoesRequests,
  loginModal,
  setCartError,
  setTrackCart,
  setTrackAddProduct,
  trackCart,
}) => {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let shoesData = [];

  if (!shoesElements) {
    shoesData = [];
  } else if (typeof shoesElements === "string") {
    shoesData = <div className="text-center text-danger">Out of stock</div>;
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
              onClick={() =>
                addToCart(
                  setTrackAddProduct,
                  loginModal,
                  currentUser,
                  shoe.id,
                  setTrackCart,
                  setCartError
                )
              }
            >
              Add<i className="bi bi-cart4"></i>
            </button>
          </div>
        </div>
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
            onClick={() =>
              addToCart(
                setTrackAddProduct,
                loginModal,
                currentUser,
                shoe.id,
                setTrackCart,
                setCartError
              )
            }
          >
            Add<i className="bi bi-cart4"></i>
          </button>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div id="products">{shoesData}</div>
    </>
  );
};

export default Products;
