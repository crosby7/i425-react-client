/*
Name: Cameron Crosby
Date: 11/6/2025
File: Footer.jsx
Description: create a common page footer
*/

const Footer = () => {
  const year = new Date().getFullYear(); //determine the current year with JavaScript
  return (
    <footer>
      <div className="container">
        <span>&copy;FreshMart and Associates. 2017-{year}</span>
      </div>
    </footer>
  );
};

export default Footer;
