import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


 const baseURL =`http://localhost:5050`

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
  selectedCategoryId: number | null // `null` when no category is selected
  // ... any other state properties
}

export const fetchCategory = createAsyncThunk('categories/fetchCategory', async(_, { rejectWithValue }) =>
{
   try {
     const response = await axios.get(`${baseURL}/categories`)
     return response.data.payload.allCategoriesOnPage
   } catch (error) {
    return rejectWithValue(error)
   }
})
export const createCategory = createAsyncThunk('categories/createCategory', async(category:Partial<category> , {rejectWithValue}) =>
{
  try {
    const response = await  axios.post(`${baseURL}/categories`,{name: category.name})
     return response.data
  } catch (error) {
    if(axios.isAxiosError(error) && error.response?.data?.errors){
      const errorData = error.response.data.errors
      return rejectWithValue(`${errorData.message}`)
    }
    if(axios.isAxiosError(error) && error.response?.data?.msg){
      return rejectWithValue(error.response?.data?.msg)
    }
  }
})
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async(id:string, {rejectWithValue}) =>
{
 try {
   await  axios.delete(`${baseURL}/categories/${id}`)
   return id
 } catch (error) {
  return rejectWithValue(error)
 }
})
export const updateCategory = createAsyncThunk('categories/updateCategory', async(category:Partial<category>, {rejectWithValue} ) =>
{
 try {
   const id = category._id
   const response = await  axios.put(`${baseURL}/categories/${id}`,{name:category.name})
   return response.data
 } catch (error) {
  if(axios.isAxiosError(error) && error.response?.data?.errors){
    const errorData = error.response.data.errors
    return rejectWithValue(`${errorData.message}`)
  }
  if(axios.isAxiosError(error) && error.response?.data?.msg){
    return rejectWithValue(error.response?.data?.msg)
  } }
})

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
    clearError: (state) => {
      state.error= null
    },
    sortCategoryByName: (state, action) => {

      const sortCategory = action.payload
    if(sortCategory === state.categoryArray){
      state.categoryArray.sort((a, b) => a.name.localeCompare(b.name))
    }
    },
},
  extraReducers(builder){
    builder.addCase(fetchCategory.fulfilled, (state,action) => {
      state.categoryArray = action.payload
      state.isLoading = false
    })
    builder.addCase(createCategory.fulfilled, (state,action) => {
     try {
      state.categoryArray.push(action.payload.payload)
      const msg = action.payload.message
      alert(msg)
     } catch (error) {
      console.log(error);
     }
    })  
    builder.addCase(deleteCategory.fulfilled, (state,action) => {
      state.categoryArray = state.categoryArray.filter((category)=> category._id !== action.payload)
      state.isLoading = false
    }) 
     builder.addCase(updateCategory.fulfilled, (state,action) => {
      const {_id , name} = action.payload
      const foundCategory = state.categoryArray.find((category) =>category._id === _id)
      if(foundCategory && name){
        foundCategory.name = name
      }
      const msg = action.payload.message
      alert(msg)
    })
    builder.addMatcher(
      (action) => action.type.endsWith(`/pending`),
      (state) => {
        state.isLoading = true
        state.error = null
      })
    builder.addMatcher(
      (action) => action.type.endsWith(`/rejected`),
      (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An Error accrued'
      })
  }
})
export const { sortCategoryByName, categoryRequest, categoriesSuccess , clearError} = categorySlice.actions

export default categorySlice.reducer



