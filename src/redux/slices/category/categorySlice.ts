import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCategory = createAsyncThunk('users/fetchCategory', async() =>
{
  try {
    const response = await api.get('/mock/e-commerce/categories.json')
      // checking there is any issue with network
      if (!response) {
        throw new Error('Network response error');
      }
    return response.data

  } 
  
  catch (error) {
    //checking if there is any issue when fetch process
  console.log(error) 
  }
})

export type category = {
  id: number
  name: string
}

export type categoryState = {
  categories: category[]
  error: null | string
  isLoading: boolean
}

const initialState: categoryState = {
  categories: [],
  error: null,
  isLoading: false
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder.addCase(fetchCategory.pending, (state)=> {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchCategory.fulfilled, (state,action) => {
      state.categories = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accured'
      state.isLoading = false
    })

  }
})
export const {  } = categorySlice.actions

export default categorySlice.reducer





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
