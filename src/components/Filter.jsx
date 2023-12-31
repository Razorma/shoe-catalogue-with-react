import React, { useEffect, useState } from "react";

const Filter = ({
  filterData,
  setFilterData,
  setTrackAddProduct,
setTrackCart
}) => {

  const searchToggler = document.querySelector(".search-toggler");

 


  function handleChange(event) {
    const { name, value } = event.target;

    setFilterData((prevFilterData) => {
      return {
        ...prevFilterData,
        [name]: value,
      };
    });
    setTrackAddProduct((prevTrack) => prevTrack + 1);
    setTrackCart((prevTrack) => prevTrack + 1);
  }
  

  function exitSearch() {
    searchToggler.click("");
    setFilterData({
      brand: "",
      color: "",
      size: "",
    });
    setTrackAddProduct((prevTrack) => prevTrack + 1);
    setTrackCart((prevTrack) => prevTrack + 1);

  }

  return (
    <nav
      id="Products"
      className=" p-0 m-0 justify-content-center navbar mt-5   pt-3 pb-0"
    >
      <button
        className="navbar-toggler search-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mynavbar"
        aria-controls="mynavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Filter <span></span>
        <i className="bi bi-filter-square-fill"></i>
      </button>
      <div
        className="p-0 m-0 justify-content-center collapse navbar-collapse "
        id="mynavbar"
      >
        <div className="p-0 m-0 navbar-nav row mt-2 container-fluid px-5 ">
          <p className="errorSelect text-center text-danger"></p>
          <select
            id="brandNav"
            name="brand"
            className="col mt-2 form-select selectBrandNav mx-2"
            value={filterData.brand}
            onChange={handleChange}
          >
            <option value="" data-name="brands">
              Select Brand
            </option>
            <option value="nike" data-name="Nike">
              Nike
            </option>
            <option value="adidas" data-name="adidas">
              adidas
            </option>
            <option value="puma" data-name="Puma">
              Puma
            </option>
            <option value="vans" data-name="Vans">
              Vans
            </option>
          </select>
          <select
            id="colorNav"
            name="color"
            className="col mt-2 form-select selectColorNav mx-2"
            value={filterData.color}
            onChange={handleChange}
          >
            <option value="" data-name="colors">
              Select Color
            </option>
            <option value="black" data-name="Black">
              Black
            </option>
            <option value="white" data-name="White">
              White
            </option>
            <option value="blue" data-name="blue">
              blue
            </option>
            <option value="red" data-name="red">
              Red
            </option>
            <option value="grey" data-name="Red">
              Grey
            </option>
          </select>
          <select
            id="sizeNav"
            name="size"
            className="col mt-2 form-select selectSizeNav mx-2"
            value={filterData.size}
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
          <div className="buttons">

            <input
              type="button"
              value="Back"
              className="col-6 pt-0 mt-2 btn btn-secondary backNav"
              id="backButton"
              // style={{ display: "none" }}
              onClick={exitSearch}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Filter;
