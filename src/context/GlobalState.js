// GlobalState.js
import { createContext, useContext, useReducer } from "react";
import AppReducer, { initialState } from "./AppReducer";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <GlobalContext.Provider
      value={{
        basket: state.basket,
        user: state.user,
        deliveryAddress: state.deliveryAddress, 
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const setDeliveryAddress = (address) => ({
  type: "SET_DELIVERY_ADDRESS",
  payload: address,
});

export default GlobalProvider;

export const useAuth = () => {
  return useContext(GlobalContext);
};

