import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import withdrawalReducer from "./slices/withdrawalSlice";
import paymentMethodReducer from "./slices/paymentMethodSlice";
import notificationReducer from "./slices/notificationSlice";

import adminUserReducer from "./slices/admin/adminUserSlice";
import adminWithdrawalReducer
  from "./slices/admin/adminWithdrawalSlice";
import adminProductReducer from "./slices/admin/adminProductSlice";
import adminOrderReducer from "./slices/admin/adminOrderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    products: productReducer,
    orders: orderReducer,
    withdrawal: withdrawalReducer,
    paymentMethod: paymentMethodReducer,
    notification: notificationReducer,

    adminUsers: adminUserReducer,
    adminWithdrawals: adminWithdrawalReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer,
  },
});