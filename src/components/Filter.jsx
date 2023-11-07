import React, { useEffect, useState } from "react";

const Filter = ({shoesRequests,setShoesElements}) => {
    const backNav = document.querySelector(".backNav")
    const searchToggler = document.querySelector(".search-toggler")
    const errorSelect = document.querySelector(".errorSelect")
  const [filterData, setFilterData] = useState({
    brand: "",
    color: "",
    size: "",
  });

  function handleChange(event) {
    
    const { name, value} = event.target;
    
    setFilterData((prevFilterData) => {
      return {
        ...prevFilterData,
        [name]: value,
      };
    });
  }
  function handleSubmit(){
    if (filterData.brand && filterData.size && filterData.color) {
        shoesRequests
            .getShoeByBrandSizeAndColor(filterData.brand, filterData.size, filterData.color)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                
            });
    } else if (filterData.brand && filterData.size && !filterData.color) {
        shoesRequests
            .getShoeByBrandAndSize(filterData.brand, filterData.size)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
            });
    } else if (filterData.color && filterData.size && !filterData.brand) {
        shoesRequests
            .getShoeBySizeAndColor(filterData.size, filterData.color)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
            });
    } else if (filterData.brand && filterData.color && !filterData.size) {
        shoesRequests
            .getShoeByBrandAndColor(filterData.brand, filterData.color)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
            });
    } else if (filterData.brand && !filterData.size && !filterData.color) {
        shoesRequests
            .getShoeByBrand(filterData.brand)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
            });
    } else if (!filterData.brand && !filterData.color && filterData.size) {
        shoesRequests
            .getShoeBySize(filterData.size)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
            });
    } else if (!filterData.brand && filterData.color && !filterData.size) {
        shoesRequests
            .getShoeByColor(filterData.color)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                if (response.error) {
                    productContainer.classList.add('danger')
                    productContainer.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        productContainer.innerHTML = ""
                        productContainer.classList.remove('danger')
                    }, 3000)
                }

            });
    } else {
        shoesRequests
            .getShoes()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
            });
    }
    
    backNav.style.display = "flex"

  }

  function exitSearch(){
    searchToggler.click('')
    setFilterData({
            brand: "",
            color: "",
            size: "",
      });
      backNav.style.display = "none"
      shoesRequests
            .getShoes()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                setShoesElements(data)
            });

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
        Filter
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
            <button
              type="submit"
              className="col-6 pt-1 mt-2 btn btn-primary searchNav "
              onClick={handleSubmit}
            >
              Search
            </button>

            <input
              type="button"
              value="Back"
              className="col-6 pt-0 mt-2 btn btn-secondary backNav"
              id="backButton"
              style={{ display: "none" }}
              onClick={exitSearch}
              
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Filter;
