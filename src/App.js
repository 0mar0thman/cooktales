// index.js أو App.js
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FooterApp from "./components/FooterApp";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Login from "./components/Login";
import Orders from "./components/Orders";
import { auth } from "./firebase";
import { useAuth } from "./context/GlobalState";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProductDetails from "./components/ProductDetails";
import ReturnPolicy from "./components/ReturnPolicy";
import "./App.css";

const App = () => {
  
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51Q39DlAMrFqnm9DlyfShSMscBf5jTRK8YoGecYl6rVS6RFD5THtNW0hNNxXpH4rrq3EIiKqjJ11TynEdLBFlwNo900mX0HJfZj"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <FooterApp />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
              <FooterApp />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
              <FooterApp />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
              <FooterApp />
            </>
          }
        />

        <Route
          path="/product/:id"
          element={
            <>
              <Header />
              <ProductDetails />
              <FooterApp />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Login />
              <FooterApp />
            </>
          }
        />
          <Route path="/return_policy" element={<ReturnPolicy/>} />
        <Route path="*" element={<h1>not found</h1>} />
      
      </Routes>
    </div>
  );
};

export default App;
