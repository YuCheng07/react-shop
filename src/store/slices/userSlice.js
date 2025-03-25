import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isUserLogin: false,
    isLineLogin: false,
  },
  reducers: {
    setIsUserLogin: (state, action) => {
      state.isUserLogin = action.payload
    },
    setIsLineLogin: (state, action) => {
      state.isLineLogin = action.payload
    }
  }
})

// 導出定義的方法
export const { setIsUserLogin, setIsLineLogin } = userSlice.actions

export default userSlice.reducer