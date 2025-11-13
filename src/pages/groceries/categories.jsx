/**
 * Author: Zach Loucks
 * Date: 11/13/2025
 * File: categories.jsx
 * Description: category page
 */
import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import "../../assets/css/category.css";
import useXmlHttp from "../../services/useXmlHttp";
import {useAuth} from "../../services/useAuth";

const Professors = () => {
    const {user} = useAuth();
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Categories");
    const url = settings.baseApiUrl + "/categories";
    const {
        error,
        isLoading,
        data: categories
    } = useXmlHttp(url, "GET", {Authorization:`Bearer ${user.jwt}`});
    useEffect(() => {
        setSubHeading("All Categories");
    }, [pathname]);

    return (
        <>
            <div className="main-heading">
                <div className="container">Category</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <div>{error}</div>}
                {isLoading && <div className="image-loading">
                    Please wait while the data is being loaded
                    <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                </div>}
                {categories && <div className="category-container">
                    <div className="category-list">
                        {categories.map((category) => (
                            <NavLink key={category.id}
                                     className={({isActive}) => isActive ? "active" : ""}
                                     to={`/professors/${category.id}`}>
                                <span>&nbsp;</span><div>{category.name}</div>
                            </NavLink>
                        ))}
                    </div>
                    <div className="category-item">
                        <Outlet context={[subHeading, setSubHeading]}/>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default Categories;