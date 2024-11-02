import React from "react";
import "./style-header/ReturnPolicy.css";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  return (
    <div className="return-policy-container">
      <header className="return-policy-header">
        <h1>Return Policy</h1>
      </header>

      <section className="policy-content">
        <h2>Our Return Policy</h2>
        <p>
          We are committed to ensuring your satisfaction with your purchases. If
          you are not completely satisfied with your product, you can return it
          in accordance with our return policy.
        </p>

        <h3>Return Timeframe</h3>
        <p>
          You have 30 days from the date of purchase to return an item. To be
          eligible for a return, your item must be unused and in the same
          condition that you received it.
        </p>

        <h3>Refunds</h3>
        <p>
          Once we receive your returned item, we will inspect it and notify you
          of the approval or rejection of your refund. If approved, the refund
          will be processed within a few days.
        </p>

        <h3>Exchanges</h3>
        <p>
          If you need to exchange your product for the same item, please contact
          us, and we will help facilitate the process.
        </p>

        <h3>Non-returnable Items</h3>
        <p>
          Certain types of items cannot be returned, such as perishable goods,
          custom products, and personal care items.
        </p>

        <h3>Contact Us</h3>
        <p>
          If you have any questions regarding returns or refunds, feel free to{" "}
          <Link to="/login">contact us</Link>.
        </p>
      </section>

      <footer className="return-policy-footer">
        <p>Thank you for shopping with us!</p>
      </footer>
    </div>
  );
};

export default ReturnPolicy;
