//Function to get and post http request to the server
export default function shoes(axios) {
    
    //Get all the shoes
        function getShoes() {
            return axios.get('https://shoes-api-sr1k.onrender.com/api/shoes')
        }
    //sign the user up to the server
        function signUp(username, password, surname, email) {
            return axios.post('https://shoes-api-sr1k.onrender.com/api/shoes/addUser', {
                "username": username,
                "password": password,
                'surname': surname,
                'email': email
            })
        }
    //log the user
        function login(email, password) {
            return axios.post('https://shoes-api-sr1k.onrender.com/api/login/', {
                "email": email,
                "password": password,
            })
        }
        function logOut() {
            return axios.post('https://shoes-api-sr1k.onrender.com/api/logOut/')//,
        }
    //add a shoe request
        function addShoe(data) {
            return axios.post('https://shoes-api-sr1k.onrender.com/api/shoes', data)
        }
    //filter by brand request
        function getShoeByBrand(brandName) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/shoes/brand/${brandName}`)
        }
    //filter by size request
        function getShoeBySize(size) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/shoes/size/${size}`)
        }
    //filter by brand and size
        function getShoeByBrandAndSize(brandName, size) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/shoes/brand/${brandName}/size/${size}`)
        }
    // filter by color
        function getShoeByColor(color) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/shoes/color/${color}`)
        }
    //filter by brand and color
        function getShoeByBrandAndColor(brand, color) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/shoes/brand/${brand}/color/${color}`)
        }
    //filter by size and color 
        function getShoeBySizeAndColor(size, color) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/shoes/size/${size}/color/${color}`)
        }
    //filter by brand color and size
        function getShoeByBrandSizeAndColor(brand, size, color) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/shoes/brand/${brand}/color/${color}/size/${size}`)
        }
    //get user cart
        function getCart(username) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/getCart/username/${username}`)
        }
    //get orders foe admin
        function getOrders() {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/getOrders`)
        }
    //get availabe sizes
        function getAvailableShoeSizes(brand, shoeColor, shoeName) {
            return axios.get(`https://shoes-api-sr1k.onrender.com/api/sizes`, {
                brandname: brand,
                color: shoeColor,
                name: shoeName
            })
        }
    //add a shoe to the cart for a user
        function addToCart(username, id) {
            return axios.post(`https://shoes-api-sr1k.onrender.com/api/addToCart/username/${username}`, {
                "id": id
            })
        }
    //remove a shoe from the cart
        function deleteCartItem(username, id, qty) {
            return axios.post(`https://shoes-api-sr1k.onrender.com/api/shoes/cancelCart`, {
                'username': username,
                "id": id,
                "qty": qty
            })
        }
    //chechout the items in the cart for a user
        function checkoutCartItem(username) {
            return axios.post(`https://shoes-api-sr1k.onrender.com/api/shoes/sold/${username}`)
        }
    //clear the history of orders for admin
        function clearCartHistory() {
            return axios.post(`https://shoes-api-sr1k.onrender.com/api/clearCartHistory`)
        }
    
        return {
            signUp,
            login,
            logOut,
            getShoes,
            addShoe,
            getShoeByBrand,
            getCart,
            getShoeBySize,
            getShoeByBrandAndSize,
            addToCart,
            deleteCartItem,
            checkoutCartItem,
            getOrders,
            getShoeByColor,
            getShoeByBrandAndColor,
            getShoeBySizeAndColor,
            getShoeByBrandSizeAndColor,
            getAvailableShoeSizes,
            clearCartHistory
        }
    }