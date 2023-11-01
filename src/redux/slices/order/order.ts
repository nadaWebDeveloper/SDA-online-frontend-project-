import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchOrder = createAsyncThunk('users/fetchOrder', async() =>
{
  try {
  const response = await api.get('/mock/e-commerce/orders.json')
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

export type order = {
id: number,
productId: number,
userId: number,
 purchasedAt:string
}

export type orderState = {
  orders: order[]
  error: null | string
  isLoading: boolean
 

}

const initialState: orderState = {
orders: [],
  error: null,
  isLoading: false,
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {  },

  extraReducers(builder){
    builder.addCase(fetchOrder.pending, (state)=> {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchOrder.fulfilled, (state,action) => {
      state.orders = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accured'
      state.isLoading = false
    })

  }
})
export const { } = orderSlice.actions

export default orderSlice.reducer




