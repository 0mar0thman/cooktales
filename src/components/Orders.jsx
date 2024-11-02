import React, { useEffect, useState } from "react";
import { useAuth } from "../context/GlobalState";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Order from "./Order";
import "./style-header/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders");
      const orderedRef = query(collRef, orderBy("created", "desc"));
      onSnapshot(orderedRef, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      setLoading(false);
    } else {
      setOrders([]);
    }
  }, [user]);

  const [loading, setLoading] = useState(true);
  if (loading) {
    const loadingElementsCount = 8;

    return (
      <div className="my-5">
        <h1 className="d-flex justify-center fs-5 ">
          please log in and try again
        </h1>
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
      </div>
    );
  }
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders-order">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
