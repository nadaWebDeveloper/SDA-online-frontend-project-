import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchOrders = createAsyncThunk('users/fetchOrders', async() =>
{
  try {
    const response = await api.get('/mock/e-commerce/orders.json')
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


export type order = {
  id: number
  productId: number,
  userId: number,
  purchasedAt: string
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

      const filterCategory= state.orders.filter((order) => order.id !== action.payload)
      state.orders = filterCategory

    },
    updateOrder: (state, action) => {
      const {id,name } = action.payload; 
      console.log(action.payload);
        const orderExist = state.orders.find((category)=> category.id === id)

      // state.userData = action.payload   
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
      state.error = action.error.message || 'An Error accured'
      state.isLoading = false
    })

  }
})
export const { deleteOrder } = ordersSlice.actions

export default ordersSlice.reducer




