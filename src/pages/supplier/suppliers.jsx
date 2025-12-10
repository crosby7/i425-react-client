/*
Name: Zach Loucks
Date: 12/9/25
File: suppliers.jsx
Description: Display suppliers
 */

import {settings} from "../../config/config";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {NavLink} from "react-router-dom";
import {useState, useEffect} from "react";
import "/src/assets/css/supplier.css";



const Suppliers = () => {
    const url = settings.baseApiUrl + "/suppliers";
    const {user} = useAuth();

    //declare the data fetching function
    const {
        error,
        isLoading,
        data: suppliers
    } = useAxios(url, "GET", {Authorization: "Bearer " + user.jwt});
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
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                    </div>
                }
                {suppliers &&
                    <div className="supplier-container">
                        <div className="supplier-row supplier-row-header">
                            <div>Supplier ID</div>
                            <div>Name</div>
                            <div>Phone</div>
                            <div>Email</div>
                            <div>Address</div>
                            <div>Delivery Schedule</div>
                        </div>
                        {suppliers.data && suppliers.data.map((supplier) => (
                            <div key={supplier.supplierId} className="supplier-row">
                                <div>{supplier.supplierId}</div>
                                <div>{supplier.name}</div>
                                <div>{supplier.phone}</div>
                                <div>{supplier.email}</div>
                                <div>{supplier.address}</div>
                                <div>{supplier.deliverySchedule}</div>
                            </div>
                        ))}
                    </div>}
            </div>
        </>
    );
};

export default Suppliers;