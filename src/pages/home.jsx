/*
Name: Cameron Crosby
Date: 11/12/2025
File: home.jsx
Description: the home page jsx
*/

const Home = () => {
  return (
    <>
      <h1 className="main-heading">Welcome to FreshMart!</h1>
      <h3 className="sub-heading">Your Local Grocery Store and Market</h3>
      <div className="box-container">
        <div className="boxy-text">
          <h4>SPECIALS!</h4>
          <p>
            Get big discounts all December long on bakery items!
          </p>
        </div>
        <div className="boxy-text">
          <p>
            This is a demo React Single Page Application consuming data from our
            FreshMart API.
          </p>
          <p>
            We used{" "}
            <a href="https://reactjs.org/" target="_blank">
              React
            </a>{" "}
            and{" "}
            <a href="https://react-bootstrap.github.io/" target="_blank">
              React-Bootstrap
            </a>{" "}
            to create the user interface.
          </p>
        </div>
        <div className="boxy-text">
          <h4>Get it Before its Gone!</h4>
          <p>
            Bananas and Apples are almost out of stock! Grab some today!
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
