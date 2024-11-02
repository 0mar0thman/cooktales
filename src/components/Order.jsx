import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import "./style-header/Order.css";
import { Link } from "react-router-dom";

const Order = ({ order }) => {
  return (
    <div className="order">
      <p className="p-header">
        <Link to="/return_policy">
          <strong>Return Policy:</strong>{" "}
        </Link>{" "}
        Products can be returned within 30 days.
      </p>
      <div className="w-10">
        {order.data.items.map((item) => (
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
      <div className="order-total text-center">
        <p>
          <span className="fw-bold">Order ID:</span>
          <span> {order.id}</span>
        </p>
        <p>
          <span className="fw-bold">Order Date:</span>
          <span>
            {" "}
            {moment(order.data.created).format("MMMM Do YYYY, h:mm:ss a")}
          </span>{" "}
        </p>
        <NumericFormat
          renderText={(value) => (
            <>
              <h3>Order Total: {value}</h3>
            </>
          )}
          decimalScale={2}
          value={order.data.amount * 0.07 + order.data.amount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
    </div>
  );
};

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      created: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      amount: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Order;
