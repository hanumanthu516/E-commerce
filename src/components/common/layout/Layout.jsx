import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../layout/Layout.css";
import CurrencyConverter from "../../pages/corrency-converter/CurrencyConverter";

const Layout = (props) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <CurrencyConverter />
      <Header />

      <div className="flex-grow-1 d-flex">
        <main className="text-bg-light flex-grow-1 p-3">{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
