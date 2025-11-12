/*
Name: Cameron Crosby
Date: 11/12/2025
File: routes.jsx
Desc: defines the routes for the app
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../services/useAuth.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import Layout from "../components/Layout";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
import Signin from "../pages/auth/signin.jsx";
import Signup from "../pages/auth/signup.jsx";
import Signout from "../pages/auth/signout.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route
              path="professors"
              element={
                <RequireAuth>
                  <Professors />
                </RequireAuth>
              }
            >
              <Route
                index
                element={<p>Select a professor to view details.</p>}
              ></Route>
              <Route path=":professorId" element={<Professor />}>
                <Route path="classes" element={<Classes />}></Route>
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
