import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchUser = createAsyncThunk('users/fetchUser', async() =>
{
  const response = await api.get('/mock/e-commerce/users.json')
  return response.data
})

export type user = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string | number
  role: string
}

export type userState = {
  users: user[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: user | null
}

//set the data in the local storage

const initialState: userState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: false,
  userData: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
    }
  },
  extraReducers(builder){
    builder.addCase(fetchUser.pending, (state)=> {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchUser.fulfilled, (state,action) => {
      state.users = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accured'
      state.isLoading = false
    })

  }
})
export const { login ,logout } = userSlice.actions

export default userSlice.reducer





// export type Product = {
//   id: number
//   name: string
//   image: string
//   description: string
//   categories: number[]
//   variants: string[]
//   sizes: string[]
// }

// export type ProductState = {
//   items: Product[]
//   error: null | string
//   isLoading: boolean
// }

// const initialState: ProductState = {
//   items: [],
//   error: null,
//   isLoading: false
// }

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     productsRequest: (state) => {
//       state.isLoading = true
//     },
//     productsSuccess: (state, action) => {
//       state.isLoading = false
//       state.items = action.payload
//     },
//     addProduct: (state, action: { payload: { product: Product } }) => {
//       // let's append the new product to the beginning of the array
//       state.items = [action.payload.product, ...state.items]
//     },
//     removeProduct: (state, action: { payload: { productId: number } }) => {
//       const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
//       state.items = filteredItems
//     }
//   }
// })
// export const { removeProduct, addProduct, productsRequest, productsSuccess } = userSlice.actions

// export default userSlice.reducer
