import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/store/slices/userSlice.js'
import cartReducer from '@/store/slices/cartSlice.js'
import checkoutReducer from '@/store/slices/checkoutSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  }
})

export default store