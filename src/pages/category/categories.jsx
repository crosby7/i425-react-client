/**
 * Author: Zach Loucks
 * Date: 11/13/2025
 * File: categories.jsx
 * Description: category page -- all categories
 */
import { settings } from "../../config/config.jsx";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/category.css";
import useXmlHttp from "../../services/useXmlHttp.jsx";
import { useAuth } from "../../services/useAuth.jsx";

const Categories = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [subHeading, setSubHeading] = useState("All Categories");
  const [hasActiveCategory, setHasActiveCategory] = useState(false);
  const url = settings.baseApiUrl + "/categories";
  const {
    error,
    isLoading,
    data: categories,
  } = useXmlHttp(url, "GET", { Authorization: `Bearer ${user.jwt}` });
  useEffect(() => {
    setSubHeading("All Categories");
    setHasActiveCategory(pathname !== "/categories");
  }, [pathname]);

  return (
    <>
      <div className="main-heading">
        <div className="container">Shop Groceries by Category</div>
      </div>
      <div className="sub-heading">
        <div className="container">{subHeading}</div>
      </div>
      <div className={`main-content container`}>
        {error && <div>{error}</div>}
        {isLoading && (
          <div className="image-loading">
            Please wait while the data is being loaded
            <img src="/src/assets/img/loading.gif" alt="Loading ......" />
          </div>
        )}
        {categories && (
          <div
            className={`category-container ${
              !hasActiveCategory ? "default-category-container" : ""
            }`}
          >
            <div className="category-list">
              {categories.map((category) => (
                <NavLink
                  key={category.categoryId}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={`/categories/${category.categoryId}`}
                >
                  <span>&nbsp;</span>
                  <div>{category.name}</div>
                </NavLink>
              ))}
            </div>
            <div
              className="category-item">
              <Outlet context={[subHeading, setSubHeading]}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
