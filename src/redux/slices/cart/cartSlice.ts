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
        }
    }
})

export const { addToCart} = cartSlice.actions
export default cartSlice.reducer