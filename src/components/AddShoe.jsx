import React from "react";
import { useState, useEffect } from "react";
import shoes from "../apiCalls/requests";
import axios from "axios";
axios.defaults.withCredentials = true;

const shoesRequests = shoes(axios);
const AddShoe = ({loginModal}) => {
  const [adminMessage, setAdminMessage] = useState("");
  const [addData, setAddData] = useState({
    nameofShoe: "",
    colorOfshoe: "",
    brandofShoe: "",
    photo: "",
    priceofShoe: "",
    sizeofShoe: "",
    stockofShoe: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setAddData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (
      addData.nameofShoe === "" &&
      addData.colorOfshoe === "" &&
      addData.brandofShoe === "" &&
      addData.photo === "" &&
      addData.priceofShoe === "" &&
      addData.sizeofShoe === "" &&
      addData.stockofShoe === ""
    ) {
      setAdminMessage("Please enter Shoe");
      setTimeout(() => {
        setAdminMessage("");
      }, 3000);
    } else {
      if (addData.nameofShoe === "") {
        setAdminMessage("Please enter the name of the Shoe");
        setTimeout(() => {
          setAdminMessage("");
        }, 3000);
      } else if (addData.brandofShoe === "") {
        setAdminMessage("Please enter the brand of the Shoe");
        setTimeout(() => {
          setAdminMessage("");
        }, 3000);
      } else if (addData.colorOfshoe === "") {
        setAdminMessage("Please enter the color of the Shoe");
        setTimeout(() => {
          setAdminMessage("");
        }, 3000);
      } else if (addData.photo === "") {
        setAdminMessage("Please Enter Photo URL of shoe");
        setTimeout(() => {
          setAdminMessage("");
        }, 3000);
      } else if (addData.priceofShoe === "") {
        setAdminMessage("Please Enter the price of the shoe");
        setTimeout(() => {
          setAdminMessage("");
        }, 3000);
      } else if (addData.sizeofShoe === "") {
        setAdminMessage("Please Enter the size of the shoe");
        setTimeout(() => {
          setAdminMessage("");
        }, 3000);
      } else if (addData.stockofShoe === "") {
        setAdminMessage("Please Enter the stock of the shoe");
        setTimeout(() => {
          setAdminMessage("");
        }, 3000);
      } else {
        await shoesRequests
          .addShoe({
            shoe_name: addData.nameofShoe,
            shoe_picture: addData.photo,
            shoe_color: addData.colorOfshoe,
            price: addData.priceofShoe,
            stock: addData.stockofShoe,
            brand_id: addData.brandofShoe,
            shoe_size: addData.sizeofShoe,
          })
          .then((results) => {
            let response = results.data;

            if (response.error === "User not logged in") {
              localStorage.removeItem("CurrentUser")
              localStorage.removeItem("role")
              location.reload();
            }
            if (response.status === "success") {
              setAdminMessage(
                <p className="text-green">Shoe Succesfully Added</p>
              );
              setTimeout(() => {
                setAdminMessage("");
              }, 3000);
              setAddData( {
                nameofShoe: "",
                colorOfshoe: "",
                brandofShoe: "",
                photo: "",
                priceofShoe: "",
                sizeofShoe: "",
                stockofShoe: "",
              });
            }
          });
      }
    }
  }
  return (
    <form
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="addShoesToCatalogue"
      aria-labelledby="addShoesToCatalogueLabel"
    >
      <div className="offcanvas-header m-0 p-2">
        <h5 className="offcanvas-title mt-1 " id="addShoesToCatalogueLabel">
          Add Shoes
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body m-0 p-2">
        <div className="addshoeErrorElem text-center text-danger">{adminMessage}</div>
        <div className="nameOfShoeBox form-group">
          <label htmlFor="nameofShoe" className="mb-1">
            Name
          </label>
          <input
            className="nameofShoe form-control"
            id="nameofShoe"
            type="text"
            name="nameofShoe"
            value={addData.nameofShoe}
            onChange={handleChange}
          />
        </div>
        <div className="colorOfShoeBox form-group">
          <label htmlFor="colorOfshoe" className="mb-1 mt-1">
            Color
          </label>
          <input
            className="colorOfshoe form-control"
            id="colorOfshoe"
            type="text"
            name="colorOfshoe"
            value={addData.colorOfshoe}
            onChange={handleChange}
          />
        </div>
        <div className="brandOfShoeBox form-group">
          <label htmlFor="brandofShoe" className="mb-1 mt-1">
            Brand
          </label>
          <select
            id="brandNav"
            name="brandofShoe"
            value={addData.brandofShoe}
            className="col form-select brandofShoe"
            onChange={handleChange}
          >
            <option value="" data-name="brands">
              Select Brand
            </option>
            <option value="1" data-name="Nike">
              Nike
            </option>
            <option value="2" data-name="adidas">
              adidas
            </option>
            <option value="3" data-name="Puma">
              Puma
            </option>
            <option value="4" data-name="Vans">
              Vans
            </option>
            <option value="5" data-name="Vans">
              All star
            </option>
            <option value="6" data-name="Vans">
              Fila
            </option>
          </select>
        </div>
        <div className="photoBox form-group">
          <label htmlFor="photo" className="mb-1 mt-1">
            Photo (URL)
          </label>
          <input className="photo form-control" id="photo" type="text" value={addData.photo} name="photo" onChange={handleChange}/>
        </div>
        <div className="priceOfShoeBox form-group">
          <label htmlFor="priceofShoe" className="mb-1 mt-1">
            Price
          </label>
          <input
            className="priceofShoe form-control"
            id="priceofShoe"
            type="number"
            name="priceofShoe"
            value={addData.priceofShoe}
            onChange={handleChange}
          />
        </div>
        <div className="sizeofShoeBox form-group">
          <label htmlFor="sizeofShoe" className="mb-1 mt-1">
            Size
          </label>
          <select
            id="sizeNav"
            name="sizeofShoe"
            value={addData.sizeofShoe}
            className="col form-select sizeofShoe "
            onChange={handleChange}
            
          >
            <option value="" data-name="sizes">
              Select Size
            </option>
            <option value="5" data-name="five">
              5
            </option>
            <option value="6" data-name="six">
              6
            </option>
            <option value="7" data-name="seven">
              7
            </option>
          </select>
        </div>
        <div className="stockofShoeBox form-group">
          <label htmlFor="stockofShoe" className="mb-1 mt-1">
            Stock
          </label>
          <input
            className="stockofShoe form-control"
            id="stockofShoe"
            type="number"
            name="stockofShoe"
            value={addData.stockofShoe}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex  container-fluid justify-content-end">
          <button className="addShoe btn btn-secondary mt-2 text-center " onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
export default AddShoe;
