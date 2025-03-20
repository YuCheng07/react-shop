import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartList: [],
	},
	reducers: {
		addToCart: (state, action) => {
			if (state.cartList.find((item) => item.id === action.payload.id)) {
				state.cartList = state.cartList.map((item) => {
					if (item.id === action.payload.id) {
						return { ...item, quantity: item.quantity + 1 }
					} else {
						return item
					}
				})
			} else {
				state.cartList.push({ ...action.payload, quantity: 1 })
			}
      localStorage.setItem('cartList', JSON.stringify(state.cartList))
		},
    removeItemFromCart: (state, action) => {
      state.cartList = state.cartList.filter(item => item.id !== action.payload)
      localStorage.setItem('cartList', JSON.stringify(state.cartList))
      
    },
    incrementItemQuantity: (state, action) => {
      state.cartList = state.cartList.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
      localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    decrementItemQuantity: (state, action) => {
      state.cartList = state.cartList.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 }
        } else {
          return item
        }
      })
      localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    setCartList: (state, action) => {
      state.cartList = action.payload
    },
  },
})

export const { addToCart, removeItemFromCart, incrementItemQuantity, decrementItemQuantity, setCartList } = cartSlice.actions

export default cartSlice.reducer
