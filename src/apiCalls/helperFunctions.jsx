export function addToCart(
  currentUser,
  id,
  shoesRequests,
  setTrackCart,
  setCartError
) {
  if (currentUser) {
    shoesRequests.addToCart(currentUser, id).then((results) => {
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
        setTrackCart((prevTrack) => prevTrack + 1);
        // location.reload()
      }
    });
  } else {
    loginModal.click();
  }
}
export async function deleteFromCart(shoesRequests,setTrackCart ,currentUser,id, qty) {
  if (currentUser) {
  await  shoesRequests.deleteCartItem(currentUser, id, qty);
  setTrackCart((prevTrack) => prevTrack + 1);
  }else{
    loginModal.click();
  }

}