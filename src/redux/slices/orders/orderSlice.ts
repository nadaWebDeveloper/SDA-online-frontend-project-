import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { Product } from '../products/productSlice';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async(_, { rejectWithValue }) =>
{
  try {
    const response = await axios.get('/mock/e-commerce/orders.json')
      if (!response) {
        throw new Error('Network response error');
      }
    return response.data
    } 
  catch (error) {
    return rejectWithValue(error)
  }
})


export type order = {
  _id: string
  products: Product[]
  // payment: IOrderPayment
  // user: mongoose.Schema.Types.ObjectId
  status: 'pending' | 'shipping' | 'shipped' | 'delivered' | 'canceled'
  createdAt?: Date
  updatedAt?: Date
}

export type ordersState = {
  orders: order[]
  error: null | string
  isLoading: boolean
}

const initialState: ordersState = {
  orders: [],
  error: null,
  isLoading: false,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersRequest: (state) => {
   state.isLoading = true
            },

     orderSuccess: (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    },

    addOrder: (state, action) =>{

      console.log(action.payload);
      state.orders.push(action.payload)

    },

    deleteOrder :(state, action) =>{
      const filterCategory= state.orders.filter((order) => order._id !== action.payload)
      state.orders = filterCategory
    },
    updateOrder: (state, action) => {
      const {id,name } = action.payload; 
      console.log(action.payload);
      const orderExist = state.orders.find((category)=> category._id === id)
}
},
  extraReducers(builder){
    builder.addCase(fetchOrders.pending, (state)=> {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchOrders.fulfilled, (state,action) => {
      state.orders = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accrued'
      state.isLoading = false
    })

  }
})
export const { deleteOrder } = ordersSlice.actions

export default ordersSlice.reducer




