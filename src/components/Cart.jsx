import React, { useEffect, useState } from "react";

const Cart = ({
  currentUser,
  shoesRequests,
  setUserCartItems,
  userCartItems,
}) => {
  const orderCart = document.querySelector(".cart");
  function handleCloseCart() {
    orderCart.style.right = "-1000px";
  }

  useEffect(() => {
    if(currentUser){
        shoesRequests.getCart(currentUser).then((results) => {
            const response = results.data;
            setUserCartItems({
              cartItems: response.cartItems,
              data: response.data,
              total: response.total,
            });
          })

    }
    
  }, [currentUser]);
  function handleCheckout() {
    console.log("welele");
  }
  let cartProducts = [];
  if (userCartItems.data.length === 0) {
    cartProducts = [];
  } else if (userCartItems.data.length === 1) {
    for (let data of userCartItems.data)
      cartProducts = (
        <div className="cart-box" key={data.shoe_name}>
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
                onClick={()=>console.log("lolo")}
              ></i>
              <span className="cartItemNumber">{data.qty}</span>
              <i
                className="fa-solid fa-plus plus"
                onClick={()=>console.log("lolo")}
              ></i>
            </p>
          </div>
          <i className="bi bi-trash3-fill" onClick={()=>console.log("lolo")}></i>
        </div>
      );
  } else {
    cartProducts = userCartItems.data.map((shoe) => (
      <div className="cart-box" key={shoe.shoe_name}>
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
              onClick={()=>console.log("lolo")}
            ></i>
            <span className="cartItemNumber">{shoe.qty}</span>
            <i
              className="fa-solid fa-plus plus"
              onClick={()=>console.log("lolo")}
            ></i>
          </p>
        </div>
        <i className="bi bi-trash3-fill" onClick={()=>console.log("lolo")}></i>
      </div>
    ));
  }

  return (
    <div id="cart" className="cart">
      <i className="bi bi-x closeCart" onClick={handleCloseCart}></i>
      <p className="errorCart  mt-5"></p>

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
