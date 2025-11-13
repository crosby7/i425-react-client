/*
Name: Zach Loucks
Date: 11/13/25
File: category.jsx
Description: Display category information
 */

import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams, Link, useOutletContext} from "react-router-dom";
import "../../assets/css/professor.css";
import {Outlet} from "react-router-dom";
import {useAuth} from "../../services/useAuth";
const Category = () => {
    const {user} = useAuth();
    const [subHeading, setSubHeading] = useOutletContext();
    const {categoryId} = useParams();
    const url = settings.baseApiUrl + "/categories/" + categoryId;
    const {
        error,
        isLoading,
        data: category
    } = useXmlHttp(url, "GET", {Authorization:`Bearer ${user.jwt}`});


    return (
        <>
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                </div>}
            {category && <>
                {setSubHeading(category.name)}
                <div className="category-details">
                    <div className="category-info">
                        <div><strong>Description</strong>: {category.description}</div>
                        <div><strong>Aisle Number</strong>: {category.aisleNumber}</div>
                        <div><strong>Groceries</strong>: <Link to={`/categories/${category.id}/groceries`}>Click here to
                            view Groceries in this category</Link></div>
                    </div>
                    <div className="category-photo">
                        <img src={category.categoryImg} alt={category.name} id={category.id}/>
                    </div>
                </div>
                <div className="category-groceries">
                    <Outlet/>
                </div>
            </>}
        </>
    );
};

export default Category;