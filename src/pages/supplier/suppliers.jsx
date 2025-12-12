/*
Name: Zach Loucks
Date: 12/9/25
File: suppliers.jsx
Description: Display all suppliers
 */

import { settings } from "../../config/config";
import { useAuth } from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "/src/assets/css/supplier.css";
import Pagination from "./pagination.jsx";

const Suppliers = () => {
  const [url, setUrl] = useState(settings.baseApiUrl + "/suppliers");
  const [subHeading, setSubHeading] = useState("All Suppliers");
  const { user } = useAuth();

  //declare the data fetching function
  const {
    error,
    isLoading,
    data: suppliers,
  } = useAxios(url, "GET", { Authorization: "Bearer " + user.jwt });

  const handleSearch = (e) => {
    e.preventDefault();
    const term = document.getElementById("supplier-search-term").value.trim();
    if (term == "") {
        setSubHeading("All Suppliers");
        setUrl(settings.baseApiUrl + "/suppliers");
    }
    else if (isNaN(term)) {
        setSubHeading("Suppliers containing '" + term + "'");
        setUrl(settings.baseApiUrl + "/suppliers?q=" + encodeURIComponent(term));
    }
  };

  const clearSearchBox = (e) => {
    e.preventDefault();
    document.getElementById("supplier-search-term").value = "";
    setUrl(settings.baseApiUrl + "/suppliers");
  };

  return (
    <>
      <div className="main-heading">
        <div className="container">Supplier</div>
      </div>
      <div className="sub-heading">
        <div className="container">All Suppliers</div>
      </div>
      <div className="main-content container">
        {error && <div>{error}</div>}
        {isLoading && (
          <div className="image-loading">
            Please wait while data is being loaded
            <img src="/src/assets/img/loading.gif" alt="Loading ......" />
          </div>
        )}
        {suppliers && (
          <div className="supplier-container">
            <form
              style={{ textAlign: "right", marginBottom: "3px" }}
              onSubmit={handleSearch}
            >
              <input
                id="supplier-search-term"
                placeholder="Enter search terms"
              />
              <button
                type="submit"
                className="button-light"
                style={{ marginLeft: "5px" }}
              >
                Search
              </button>
              <button
                className="button-light"
                style={{ marginLeft: "5px" }}
                onClick={clearSearchBox}
              >
                Clear
              </button>
            </form>
            <div className="supplier-row supplier-row-header row-header">
              <div>Supplier ID</div>
              <div>Name</div>
              <div>Phone</div>
              <div>Email</div>
              <div>Address</div>
              <div>Delivery Schedule</div>
            </div>
            {suppliers.data &&
              suppliers.data.map((supplier) => (
                <div key={supplier.supplierId} className="supplier-row">
                  <div>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      to={`/suppliers/${supplier.supplierId}`}
                    >
                      {supplier.supplierId}
                    </NavLink>
                  </div>
                  <div>{supplier.name}</div>
                  <div>{supplier.phone}</div>
                  <div>{supplier.email}</div>
                  <div>{supplier.address}</div>
                  <div>{supplier.deliverySchedule}</div>
                </div>
              ))}
          </div>
        )}
        {suppliers && <Pagination suppliers={suppliers} setUrl={setUrl} />}
      </div>
      <Outlet />
    </>
  );
};

export default Suppliers;
