/*
Name: Zach Loucks
Date: 11/11/25
Filename: groceries.jsx
Description: Creates the groceries file
 */

import {settings} from "../../config/config";
import useXmlHttp from "../../services/useXmlHttp";
import {useParams} from "react-router-dom";
import '../../assets/css/grocery.css';
import {useAuth} from "../../services/useAuth";


const Groceries = () => {
    const {user} = useAuth();
    const {categoryId} = useParams();
    const url = settings.baseApiUrl + "/categories/" + categoryId + "/groceries";
    const {
        error,
        isLoading,
        data: groceries
    } = useXmlHttp(url, "GET", {Authorization:`Bearer ${user.jwt}`});
    return (
        <>
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                </div>}
            {groceries && (groceries.length === 0
                    ? <p>Groceries were not found.</p>
                    : <div className="grocery-row grocery-row-header">
                        <div>Name</div>
                        <div>Price</div>
                        <div>Organic</div>
                    </div>
            )}
            {groceries && (
                groceries.map((grocery, index) => (
                    <div key={index} className="grocery-row">
                        <div>{grocery.name}</div>
                        <div>{grocery.price}</div>
                        <div>{grocery.isOrganic}</div>
                    </div>
                ))
            )}
        </>
    );
};

export default Groceries;