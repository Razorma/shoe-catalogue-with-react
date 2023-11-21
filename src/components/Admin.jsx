import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import shoes from "../apiCalls/requests";

const shoesRequests = shoes(axios);


const Admin = ({ adminOrderItems,setTrackOrders}) => {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatCurrency(value) {
    return "R" + parseFloat(value).toFixed(2);
  }

  const [orderVisibility, setOrderVisibility] = useState({});

  const toggleOrderVisibility = (username) => {
    setOrderVisibility((prevVisibility) => ({
      ...prevVisibility,
      [username]: !prevVisibility[username],
    }));
  };

  
  function clearAdminCartHistory() {
    shoesRequests.clearCartHistory()
    .then((results)=>{
      
      if(results.data.error){
        localStorage.removeItem("CurrentUser")
        localStorage.removeItem("role")
        location.reload();
      }

    })
    setTrackOrders((prev)=>prev+1)
  
  }
  const orderData = [];

  for (let result of adminOrderItems.data) {
    orderData.push(
      <div className="userOrder p-0 mx-0 mb-2 mt-3"  key={result.username}>
        <div className="row">
          <h4 className="col-sm">{result.username}</h4>
          <p className="col-sm">
            <span>Total:</span> {formatCurrency(result.total)}
          </p>
          <div className="col-sm numItems d-flex flex-row">
            <p>
              <span>Items:</span>
              {result.numItems}
            </p>
            <button className="showOrder btn btn-secondary"
            onClick={() => toggleOrderVisibility(result.username)}
            >
              {orderVisibility[result.username] ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {orderVisibility[result.username] && (
        <ul className="row p-0 cards-box m-0" id="currentOrder" x-show="open">
          {result.results.map((userData, index) => (
            <li className="card m-0 p-0" style={{ width: "15rem" }} key={index}>
              <img
                className="card-img-left "
                src={userData.shoe_picture}
                href={userData.shoe_picture}
                alt="Card image cap"
              />
              <div className="cad-body p-0 m-0">
                <p>
                  <span>Shoe Name:</span> {userData.shoe_name}
                </p>
                <p>
                  <span>Shoe Color:</span> {userData.shoe_color}
                </p>
                <p>
                  <span>Price:</span> R{userData.price}
                </p>
                <p>
                  <span>QTY:</span> {userData.qty}
                </p>
                <p>
                  <span>Brand:</span> {capitalize(userData.brand_name)}
                </p>
                <p>
                  <span>Shoe Size:</span> {userData.shoe_size}
                </p>
              </div>
            </li>
          ))}
        </ul>
         )}
      </div>
    );
  }

  return (
    <div className="order-box container-fluid " >
      <h2 className="text-center">Orders</h2>
      {orderData}

      <div className="grandTotal mt-5">
        <p>
          <span>Grand Total: </span> R{adminOrderItems.total}
        </p>
        <p>
          <span>Total Ordered Items: </span> {adminOrderItems.cartItems}
        </p>

        {!adminOrderItems.cartItems?"":<input
          type="button"
          className="btn btn-secondary clearAdmin p-0 m-0"
          value="Clear"
          onClick={clearAdminCartHistory}
        />}
      </div>
    </div>
  );
};




export default Admin;
