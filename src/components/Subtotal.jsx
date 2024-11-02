import React from "react";
import { NumericFormat } from "react-number-format";
import { useAuth } from "../context/GlobalState";
import { getBasketTotal } from "../context/AppReducer";
import { useNavigate } from "react-router-dom";
import "./style-header/Subtotal.css";

const Subtotal = () => {
  const { basket } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="custom-subtotal">
      <NumericFormat
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        fixedDecimalScale={true}
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.reduce((acc, item) => acc + item.quantity, 0)}{" "}
              items): <strong className="text-danger">{value}</strong> after tax
            </p>

            <small className="custom-subtotal__gift">
              <input type="checkbox" id="checkbox" />{" "}
              <label htmlFor="checkbox">this order contains a gift</label>
            </small>
          </>
        )}
      />
      <button
        onClick={() => navigate("/payment")}
        className="btn btn-primary"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
