import { configureStore } from "@reduxjs/toolkit";
//import appConfigReducer from "./slices/appConfigSlice";
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice"
import couponReducer from "./slices/couponSlice";
import userReducer from "./slices/userSlice";
import deliveryInfoReducer from "./slices/deliveryInfo"
import orderReducer from "./slices/orderSlice"

export default configureStore({
  reducer: {
    productReducer,
    cartReducer,
    couponReducer,
    userReducer,
    deliveryInfoReducer,
    orderReducer
  },
});
