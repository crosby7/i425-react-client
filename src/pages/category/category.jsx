/*
Name: Zach Loucks
Date: 11/13/25
File: category.jsx
Description: Display category information
 */

import { settings } from "../../config/config.jsx";
import useXmlHttp from "../../services/useXmlHttp.jsx";
import {useParams, Link, useOutletContext, Outlet} from "react-router-dom";
import "../../assets/css/category.css";
import { useAuth } from "../../services/useAuth.jsx";
import { useEffect } from "react";

const Category = () => {
  const { user } = useAuth();
  const [subHeading, setSubHeading] = useOutletContext();
  const { categoryId } = useParams();
  const url = settings.baseApiUrl + "/categories/" + categoryId;
  const {
    error,
    isLoading,
    data: category,
  } = useXmlHttp(url, "GET", { Authorization: `Bearer ${user.jwt}` });

  useEffect(() => {
    if (category) {
      setSubHeading(category.name);
    }
  }, [category, setSubHeading]);

  return (
    <>
      {error && <div>{error}</div>}
      {isLoading && (
        <div className="image-loading">
          Please wait while data is being loaded
          <img src="/src/assets/img/loading.gif" alt="Loading ......" />
        </div>
      )}
      {category && (
        <div className="category-details">
          <div className="category-info">
            <div>
              <strong>Description</strong>: {category.description}
            </div>
            <div>
              <strong>Aisle Number</strong>: {category.aisleNumber}
            </div>
            <div>
              <strong>Groceries</strong>:{" "}
              <Link to={`/categories/${categoryId}/groceries`}>
                Click here to view Groceries in this category
              </Link>
            </div>
          </div>
          <div className="category-photo">
            <img
              src={category.image}
              alt={category.name}
              id={category.categoryId}
            />
          </div>
        <div className="category-groceries">
            <Outlet/>
        </div>
        </div>
      )}
    </>
  );
};

export default Category;
