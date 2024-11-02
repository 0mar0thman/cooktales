
export const getBasketTotal = (basket) => {
  return basket.reduce((accumulator, item) => {
    const tax = item.price * 0.07; 
    const total = (item.price + tax) * item.quantity; 
    return accumulator + total;
  }, 0);
};

export const initialState = {
  basket: [],
  user: null,
  deliveryAddress: null, 
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      const existingProductIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );
      if (existingProductIndex >= 0) {
        const updatedBasket = [...state.basket];
        updatedBasket[existingProductIndex].quantity += action.item.quantity;
        return { ...state, basket: updatedBasket };
      } else {
        return {
          ...state,
          basket: [
            ...state.basket,
            { ...action.item, quantity: action.item.quantity },
          ],
        };
      }
    case "UPDATE_QUANTITY":
      const updatedBasket = state.basket.map((item) =>
        item.id === action.itemId
          ? { ...item, quantity: action.quantity }
          : item
      );
      return { ...state, basket: updatedBasket };
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.itemId),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "DELETE_FROM_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "SET_DELIVERY_ADDRESS":
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    default:
      return state;
  }
};

export const setDeliveryAddress = (address) => ({
  type: "SET_DELIVERY_ADDRESS",
  payload: address,
});

export default AppReducer;
