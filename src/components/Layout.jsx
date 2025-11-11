/*
Name: Cameron Crosby
Date: 11/11/2025
File: Layout.jsx
Description: create the page layout.
*/

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
