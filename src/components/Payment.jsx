import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import { NumericFormat } from "react-number-format";
import CheckoutProduct from "./CheckoutProduct";
import { getBasketTotal } from "../context/AppReducer";
import "./style-header/Payment.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Payment = () => {
  const { basket, user, deliveryAddress, dispatch } = useAuth();
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const orderId = `order_${Date.now()}`;

    try {
      const ref = doc(db, "users", user?.uid, "orders", orderId);
      await setDoc(ref, {
        amount: getBasketTotal(basket),
        created: Date.now(),
        items: basket,
        userId: user?.uid,
        orderId: orderId,
        deliveryAddress: deliveryAddress,
      });

      navigate("/orders");

      dispatch({ type: "DELETE_FROM_BASKET" });
      setSucceeded(true);
    } catch (err) {
      console.error("Error submitting order:", err);
      setError("Failed to complete the order. Please Signin and try again.");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (succeeded) {
      navigate("/", { replace: true });
    }
  }, [succeeded, navigate]);
  

  return (
    <div className="payment">
      <div className="payment-container d-flex flex-column">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>
              <span>Name: </span>
              {deliveryAddress?.name}
            </p>
            <p>
              <span>Email: </span>
              {deliveryAddress?.email}
            </p>
            <p>
              <span>Address: </span>
              {deliveryAddress?.address}
            </p>
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hiddenButton
              />
            ))}
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <div className="payment-priceContainer d-flex flex-column gap-3">
                <NumericFormat
                  renderText={(value) => <h3 className="NumericFormat"> Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  fixedDecimalScale={true}
                  precision={2}
                  
                />
                <button type="submit" className="btn btn-success w-75" disabled={processing || succeeded}>
                  <span>{processing ? "Processing" : "Buy Now"}</span>
                </button>
              </div>
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
