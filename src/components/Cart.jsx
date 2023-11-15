import React, { useEffect, useState } from "react";
import { addToCart,deleteFromCart } from "../apiCalls/helperFunctions";
const Cart = ({
  setTrackCart,
  currentUser,
  shoesRequests,
  setUserCartItems,
  userCartItems,
  trackAddProduct,
  setTrackAddProduct,
setCartError,
cartError
}) => {
  
  useEffect(() => {
    let init = 0
    
      async function getCart(){
        await shoesRequests.getCart(currentUser).then((results) => {
          const response = results.data;
          if (response.error) {
            console.log(response.error)
          }
          setUserCartItems({
            cartItems: response.cartItems,
            data: response.data,
            total: response.total,
          });
          // if(response.status === 'success'){
          //   setTrackCart((prevTrack)=>prevTrack+1)
          // }
        })
       
        // setTrackCart((prevTrack)=>prevTrack+1)
      }
        
      if(currentUser){    
        getCart()
       }else{
      setUserCartItems({
        cartItems: "",
        data: [],
        total: init.toFixed(2),
      });

    }
  // }, []);
  }, [trackAddProduct]);
  function handleCheckout() {
    console.log("welele");
  }
  let cartProducts = [];
 
  if (userCartItems.data.length === 0) {
    cartProducts = [];
  } else if (userCartItems.data.length === 1) {
    for (let data of userCartItems.data)
      cartProducts = (
        <div className="cart-box" key={data.shoe_id}>
          <img src={data.shoe_picture} href={data.shoe_picture} alt="" />
          <div className="cart-info">
            <span className="nameOfShoeCart">{data.shoe_name}</span>
            <span className="BrandCart">
              {data.brand_name}
              <span className="StockCart">
                In Stock: {data.stock}
                <span></span>
              </span>
            </span>
            <span className="priceOfShoeCart">
              R{data.amount}
              <span>Size:{data.shoe_size}</span>
            </span>
            <p className="addSubtract center">
              <i
                className="fa-solid fa-minus minus"
                onClick={()=> deleteFromCart(setTrackAddProduct,loginModal,setTrackCart ,currentUser,data.shoe_id, 1)}
              ></i>
              <span className="cartItemNumber">{data.qty}</span>
              <i
                className="fa-solid fa-plus plus"
                //deleteFromCart( loginModal,shoesRequests,setTrackCart ,currentUser,id, qty)
              onClick={()=>addToCart(setTrackAddProduct,loginModal,currentUser,data.shoe_id,setTrackCart,setCartError)}
              ></i>
            </p>
          </div>
          <i 
          className="bi bi-trash3-fill" 
          
          onClick={()=> deleteFromCart(setTrackAddProduct,loginModal,setTrackCart ,currentUser,data.shoe_id, data.qty)}
          ></i>
        </div>
      );
  } else {
    cartProducts = userCartItems.data.map((shoe) => (  
      <div className="cart-box" key={shoe.shoe_id}>
        <img src={shoe.shoe_picture} href={shoe.shoe_picture} alt="" />
        <div className="cart-info">
          <span className="nameOfShoeCart">{shoe.shoe_name}</span>
          <span className="BrandCart">
            {shoe.brand_name}
            <span className="StockCart">
              In Stock: {shoe.stock}
              <span></span>
            </span>
          </span>
          <span className="priceOfShoeCart">
            R{shoe.amount}
            <span>Size:{shoe.shoe_size}</span>
          </span>
          <p className="addSubtract center">
            <i
              className="fa-solid fa-minus minus"
              onClick={()=> deleteFromCart(setTrackAddProduct,loginModal,setTrackCart ,currentUser,shoe.shoe_id, 1)}
            ></i>
            <span className="cartItemNumber">{shoe.qty}</span>
            <i
              className="fa-solid fa-plus plus" onClick={()=>addToCart(setTrackAddProduct,loginModal,currentUser,shoe.shoe_id,setTrackCart,setCartError)}
            ></i>
          </p>
        </div>                       
        <i className="bi bi-trash3-fill" onClick={()=> deleteFromCart(setTrackAddProduct,loginModal,setTrackCart ,currentUser,shoe.shoe_id, shoe.qty)}></i>
      </div>
    ));
  }

  return (
    <div id="cart" className="cart">
      <i className="bi bi-x closeCart" onClick={()=> document.querySelector(".cart").style.right = "-1000px"}></i>
      <p className="errorCart  mt-5">{cartError}</p>

      <div className="cartProducts mb-5 pb-5">{cartProducts}</div>
      <div className="bg-secondary row w-100 d-flex justify-content-center paymentAmount">
        <div className="form-group w-50 ">
          <label htmlFor="paymentAmount" className="text-light">
            Enter Payment amout
          </label>
          <input
            type="number"
            className="form-control mb-2"
            id="paymentAmount"
          />
        </div>
      </div>
      <div className="checkout">
        <div className="total">
          <p>Total</p>
          <span>R</span>{" "}
          <span className="amountTotal">{userCartItems.total}</span>
        </div>
        <div className="checkoutButton">
          <button type="submit" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
