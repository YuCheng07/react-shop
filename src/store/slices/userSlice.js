import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userIsLogin: false,
    isLineLogin: false,
  },
  reducers: {
    setUserIsLogin: (state, action) => {
      state.userIsLogin = action.payload
    },
    setIsLineLogin: (state, action) => {
      state.isLineLogin = action.payload
    }
  }
})

// 導出定義的方法
export const { setUserIsLogin, setIsLineLogin } = userSlice.actions

export default userSlice.reducer