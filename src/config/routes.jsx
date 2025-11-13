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
import Groceries from "../pages/groceries/categories.jsx";
import Grocery from "../pages/groceries/category.jsx";
import Categories from "../pages/categories/categories.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route
              path="groceries"
              element={
                <RequireAuth>
                  <Groceries />
                </RequireAuth>
              }
            >
              <Route
                index
                element={<p>Select a grocery to view details.</p>}
              ></Route>
              <Route path=":groceryId" element={<Grocery />}>
                <Route path="categories" element={<Categories />}></Route>
              </Route>
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
