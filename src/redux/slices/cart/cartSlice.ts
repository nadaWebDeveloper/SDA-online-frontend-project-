import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../products/productSlice";

const data= localStorage.getItem('cart') !== null 
? JSON.parse(String(localStorage.getItem('cart')))
: []

type cartState=
{
    cartItem : Product[]
}
const initialState: cartState=
{
    cartItem:data
}


const cartSlice= createSlice ({
    name: 'cart',
    initialState:initialState,
    reducers:{
        addToCart:(state, action)=>
        {
          state.cartItem.push(action.payload)
          localStorage.setItem('cart', JSON.stringify(state.cartItem))  //to add cart to local storage 
        },
        deleteFromCart:(state, action) =>{

            const filterCart= state.cartItem.filter((category) => category.id !== action.payload)
            state.cartItem = filterCart
      
          },
    }
})

export const { addToCart , deleteFromCart} = cartSlice.actions
export default cartSlice.reducer