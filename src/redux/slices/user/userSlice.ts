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
  searchTerm: string

}

//set the data in the local storage if user refresh the page keep logged in (fetch data)
const dataReLoad = localStorage.getItem('loginData') !== null 
? JSON.parse(String(localStorage.getItem('loginData')))
: []


const initialState: userState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: dataReLoad.isLoggedIn,
  userData: dataReLoad.userData,
  searchTerm: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      //when log in save data in local Storage 
      localStorage.setItem('loginData', JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData
      }))
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
        //when log out reset data in local Storage 
        localStorage.setItem('loginData', JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        }))
    },
    searchUser:(state, action)=> {
      state.searchTerm = action.payload
    },
    deleteUser :(state, action) =>{

      const filterUser= state.users.filter((user) => user.id !== action.payload)
      state.users = filterUser

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
export const { login ,logout ,searchUser ,deleteUser  } = userSlice.actions

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
