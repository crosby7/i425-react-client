/*
Name: Cameron Crosby
Date: 11/12/2025
File: routes.jsx
Desc: defines the routes for the app
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../services/useAuth.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import Layout from "../components/Layout.jsx";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
import Signin from "../pages/auth/signin.jsx";
import Signup from "../pages/auth/signup.jsx";
import Signout from "../pages/auth/signout.jsx";
import Groceries from "../pages/grocery/groceries.jsx";
import Categories from "../pages/category/categories.jsx";
import Category from "../pages/category/category.jsx";
import Suppliers from "../pages/supplier/suppliers";
import Producers from "../pages/producer/producers";
import EditProducer from "../pages/producer/editProducer";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="categories" element={
                <RequireAuth>
                  <Categories />
                </RequireAuth>
              }>
              <Route
                index
                element={<p>Select a category to view details.</p>}
              ></Route>
              <Route path=":categoryId" element={<Category />}>
                <Route path="groceries" element={<Groceries />}></Route>
              </Route>
            </Route>
            <Route path="suppliers" element={
                <RequireAuth>
                    <Suppliers />
                </RequireAuth>
            }></Route>
            <Route path="producers" element={
                <RequireAuth>
                    <Producers />
                </RequireAuth>
            }>
                <Route path="producerId" element={<EditProducer />} />
            </Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
