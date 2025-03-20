import { createSlice } from '@reduxjs/toolkit' 

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutStage: 'address'
  },
  reducers: {
    setCheckoutStage: (state, action) => {
      state.checkoutStage = action.payload
    },
  },
})

export const { setCheckoutStage } = checkoutSlice.actions

export default checkoutSlice.reducer