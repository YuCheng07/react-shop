import { createSlice } from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState: {
		checkoutStage: 'address',
		orderInfo: {
			name: '',
			phone: '',
			address: '',
		},
		receiptType: 'email',
		receiptInfo: {
			email: '',
			address: '',
			businessNum: '',
		},
		paymentUrlInfo: {},
	},
	reducers: {
		setCheckoutStage: (state, action) => {
			state.checkoutStage = action.payload
		},
		setReceiptType: (state, action) => {
			state.receiptType = action.payload
		},
		setOrderInfo: (state, action) => {
			state.orderInfo = action.payload
		},
		setReceiptInfo: (state, action) => {
			state.receiptInfo = action.payload
		},
		setPaymentUrlInfo: (state, action) => {
			state.paymentUrlInfo = action.payload
		},
	},
})

export const {
	setCheckoutStage,
	setReceiptType,
	setOrderInfo,
	setReceiptInfo,
	setPaymentUrlInfo
} = checkoutSlice.actions

export default checkoutSlice.reducer
