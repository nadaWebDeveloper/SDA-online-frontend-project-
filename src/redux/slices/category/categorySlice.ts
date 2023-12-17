import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { baseURL } from '../products/productSlice';

export const fetchCategory = createAsyncThunk('users/fetchCategory', async() =>
{
  try {
    const response = await axios.get(`${baseURL}/categories`)
      // checking there is any issue with network
      if (!response) {
        throw new Error('Network response error');
      }
    return response.data.payload.allCategoriesOnPage
  } 
  catch (error) {
    //checking if there is any issue when fetch process
  console.log(error) 
  }
})

export const createCategory  =  async (name: {}) =>{
  const response = await  axios.post(`${baseURL}/categories`,name)
  return response.data
}

export const deleteCategory =  async (id: string) =>{
    const response = await  axios.delete(`${baseURL}/categories/${id}`)
    return response.data
}

export type category = {
  _id: string
  name: string
  createAt?: string
  updateAt?: string
  __v: number

}

export type categoryState = {
  categoryArray: category[]
  error: null | string
  isLoading: boolean
  categoryData: category | null
  selectedCategoryId: number | null; // `null` when no category is selected
  // ... any other state properties
}


const data= localStorage.getItem('categories') !== null 
? JSON.parse(String(localStorage.getItem('categories')))
: []

const initialState: categoryState = {
  categoryArray: [],
  error: null,
  isLoading: false,
  categoryData: data.categoryData,
  selectedCategoryId: null,

}



export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryRequest: (state) => {
      state.isLoading = true
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false
      state.categoryArray = action.payload
    },
    sortCategoryByName: (state, action) => {

      const sortCategory = action.payload
    if(sortCategory === state.categoryArray){
      state.categoryArray.sort((a, b) => a.name.localeCompare(b.name))
    }

    },
    addCategory: (state, action) =>{

      console.log(action.payload);
      state.categoryArray.push(action.payload)
      localStorage.setItem('categories', JSON.stringify(state.categoryArray))
      state.categoryData =action.payload

    },
    updateCategory: (state, action) => {
      const {id,name } = action.payload; 
      console.log(action.payload);
        const categoryExist = state.categoryArray.find((category)=> category._id === id)
        console.log(categoryExist);
      if(categoryExist){
        categoryExist.name = name 
      }
      state.categoryData = action.payload

},
},

  extraReducers(builder){
    builder.addCase(fetchCategory.pending, (state)=> {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchCategory.fulfilled, (state,action) => {
      state.categoryArray = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accrued'
      state.isLoading = false
    })

  }
})
export const { sortCategoryByName, categoryRequest, categoriesSuccess,addCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer



