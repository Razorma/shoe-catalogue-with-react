import axios from "axios";
import shoes from "./requests";
const shoesFunction = shoes(axios)
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
      const response = results.data
      if (response.error) {
        console.log(response.error);
        setCartError(
          response.error
        );
        setTimeout(() => {
          setCartError("");
        }, 3000);
      } else {
       
        setTrackAddProduct((prevTrack) => prevTrack + 1);
        setTrackCart((prevTrack) => prevTrack + 1);
        // location.reload()
      }
    });
    
  } else {
    loginModal.click();
  }
}
export async function deleteFromCart(setTrackAddProduct, loginModal,setTrackCart ,currentUser,id, qty) {
  if (currentUser) {
  await shoesFunction.deleteCartItem(currentUser, id, qty);
  setTrackCart((prevTrack) => prevTrack + 1);
  setTrackAddProduct((prevTrack) => prevTrack + 1);
  }else{
    loginModal.click();
  }

}

export async function chechoutFromCart() {

  if (parseFloat(amountTotal.innerHTML) !== 0.00) {
      if (paymentAmount.value > parseFloat(amountTotal.innerHTML)) {
          await shoesService.checkoutCartItem(loginUser)
              .then((results) => {
                  const response = results.data;
                  if (response.error) {
                      cartErrorElem.innerHTML = response.error
                      setTimeout(() => {
                          cartErrorElem.innerHTML = ""
                      }, 3000)
                      if (!loginUser) {
                          loginButtonModal.click()
                      }

                  } else {
                      cartErrorElem.classList.add('text-green')
                      cartErrorElem.innerHTML = "Checkout Succesfull shoe will be dilivered within 7 bussines days"
                      setTimeout(() => {
                          cartErrorElem.innerHTML = ""
                          cartErrorElem.classList.remove('text-green')
                      }, 3000)
                      if (!loginUser) {
                          loginButtonModal.click()
                      }
                  }
              });
          showShoes(currentBrand, currentSize, currentColor);
          showCart();
          if ((paymentAmount.value - parseFloat(amountTotal.innerHTML)) > 0) {
              cartErrorElem.classList.add('text-green')
              cartErrorElem.innerHTML = `Payment Successsfull <br> Your change is ${(paymentAmount.value - parseFloat(amountTotal.innerHTML)).toFixed(2)}`
              setTimeout(() => {
                  cartErrorElem.innerHTML = ""
                  cartErrorElem.classList.remove('text-green')
              }, 3000)
          }
          paymentAmount.value = ''
      } else if (paymentAmount.value == parseFloat(amountTotal.innerHTML)) {
          await shoesService.checkoutCartItem(loginUser)
              .then((results) => {
                  const response = results.data;
                  if (response.error) {
                      cartErrorElem.innerHTML = response.error
                      setTimeout(() => {
                          cartErrorElem.innerHTML = ""
                      }, 3000)
                      if (!loginUser) {
                          loginButtonModal.click()
                      }

                  } else {
                      cartErrorElem.classList.add('text-green')
                      cartErrorElem.innerHTML = "Checkout Succesfull shoe will be dilivered within 7 bussines days"
                      setTimeout(() => {
                          cartErrorElem.innerHTML = ""
                          cartErrorElem.classList.remove('text-green')
                      }, 3000)
                      if (!loginUser) {
                          loginButtonModal.click()
                      }
                  }
              });
          showShoes(currentBrand, currentSize, currentColor);
          showCart();
          paymentAmount.value = ''
      } else {
          cartErrorElem.classList.add('text-danger')
          cartErrorElem.innerHTML = `Payment Failed!!! <br> Payment amout not enough`
          setTimeout(() => {
              cartErrorElem.innerHTML = ""
              cartErrorElem.classList.remove('text-danger')
          }, 3000)
      }
  } else {
      cartErrorElem.classList.add('text-danger')
      cartErrorElem.innerHTML = `Please add shoes to cart`
      setTimeout(() => {
          cartErrorElem.innerHTML = ""
          cartErrorElem.classList.remove('text-danger')
      }, 3000)
      paymentAmount.value = ''

  }


}