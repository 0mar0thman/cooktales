import React, { useState, useEffect } from "react";
import imgCheckout from "../Images/checkout.jpg";
import { useAuth, setDeliveryAddress } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import "./style-header/Checkout.css";

const Checkout = () => {
  const { user, basket, dispatch } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
    dispatch(setDeliveryAddress({ name, email, address }));
    setName("");
    setEmail("");
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    const loadingElementsCount = 8;

    return (
      <div className="loading grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-h-screen items-center justify-items-center mt-4 mb-4">
        {Array.from({ length: loadingElementsCount }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"
          >
            <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md" />
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="Checkout-ad" src={imgCheckout} alt="product img" />
        <div className="checkout-info">
          <span>Hello,</span>
          <span className="checkout-email">
            <b>{user ? user.email : "Guest"}</b>
          </span>
          <h5 className="checkout-title">
            <b>Your Shopping Basket </b>
          </h5>
          {basket.length > 0 ? (
            basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
              />
            ))
          ) : (
            <p className="text-center text-danger">
              Your basket is currently empty! Please take a moment to fill your
              shopping cart with some exciting finds!
            </p>
          )}
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal className="Subtotal" />
      </div>

      <div className="delivery-address">
        <h5>Delivery Address</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
