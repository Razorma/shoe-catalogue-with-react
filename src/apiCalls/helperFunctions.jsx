import axios from "axios";
import shoes from "./requests";
axios.defaults.withCredentials = true;
const shoesFunction = shoes(axios);
export function addToCart(
  setTrackAddProduct,
  loginModal,
  currentUser,
  id,
  setTrackCart,
  setCartError
) {
  if (currentUser) {
    shoesFunction.addToCart(currentUser, id).then((results) => {
      const response = results.data;
      if (response.error) {
        setCartError(response.error);
        setTimeout(() => {
          setCartError("");
        }, 3000);
      } else {
        setTrackAddProduct((prevTrack) => prevTrack + 1);
        setTrackCart((prevTrack) => prevTrack + 1);
      }
    });
  } else {
    loginModal.click() 
  }
}
export async function deleteFromCart(
  setTrackAddProduct,
  loginModal,
  setTrackCart,
  currentUser,
  id,
  qty
) {
  if (currentUser) {
    await shoesFunction.deleteCartItem(currentUser, id, qty);
    setTrackCart((prevTrack) => prevTrack + 1);
    setTrackAddProduct((prevTrack) => prevTrack + 1);
  } else {
    loginModal.click() 
  }
}

export async function chechoutFromCart(
  paymentAmount,
  currentUser,
  loginModal,
  setCartError,
  userCartItems,
  setTrackCart,
  setTrackAddProduct
) {
    
  if (userCartItems.total !== '0.00') {
    
    if (paymentAmount > userCartItems.total) {

      await shoesFunction.checkoutCartItem(currentUser).then((results) => {
        const response = results.data;
        if (response.error) {
          cartErrorElem.innerHTML = response.error;
          setCartError(response.error);
          setTimeout(() => {
            setCartError("");
          }, 3000);
          if (!currentUser) {

            loginModal.click()
          }
        } else {
          setCartError(
            <div className="text-green">
              Checkout Succesfull shoe will be dilivered within 7 bussines days
            </div>
          );
          setTimeout(() => {
            setCartError("");
          }, 3000);
          if (!currentUser) {

             loginModal.click()
          }
          setTrackCart((prevTrack) => prevTrack + 1);
          setTrackAddProduct((prevTrack) => prevTrack + 1);
        }
      });

      if (paymentAmount - userCartItems.total > 0) {
        
        setCartError(
            <>
            <div className="text-green">
            Payment Successsfull <br /> Your change is{" "}
            {(paymentAmount - userCartItems.total).toFixed(2)}
          </div>
            </>
          
        );
        setTimeout(() => {
          setCartError("");
        }, 3000);
        if (!currentUser) {

           loginModal.click()
        }
        setTrackCart((prevTrack) => prevTrack + 1);
        setTrackAddProduct((prevTrack) => prevTrack + 1);
      }
      paymentAmount = "";
    } else if (paymentAmount == userCartItems.total) {
     
      await shoesFunction.checkoutCartItem(currentUser).then((results) => {
        const response = results.data;
        if (response.error) {
          setCartError(response.error);
          setTimeout(() => {
            setCartError("");
          }, 3000);
          if (!currentUser) {

             loginModal.click()
          }
        }

        setTrackCart((prevTrack) => prevTrack + 1);
        setTrackAddProduct((prevTrack) => prevTrack + 1);
        setCartError(
          <div className="text-green">
            Checkout Succesfull shoe will be dilivered within 7 bussines days
          </div>
        );
        setTimeout(() => {
          setCartError("");
        }, 3000);
      });
    } else {
      setCartError(
        <>
          <>
            Payment Failed!!! <br /> Payment amount not enough
          </>
        </>
      );
      setTimeout(() => {
        setCartError("");
      }, 3000);
      paymentAmount = "";
    }
  } else {
    setCartError(`Please add shoes to cart`);
    setTimeout(() => {
      setCartError("");
    }, 3000);

    paymentAmount = "";
  }
}
