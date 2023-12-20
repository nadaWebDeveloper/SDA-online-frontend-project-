import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// axios.defaults.withCredentials = true


 const baseURL =`http://localhost:5050`

export type category = {
  _id: string
  name: string
  createAt?: string
  updateAt?: string
  __v: number
}

export const fetchCategory = createAsyncThunk('categories/fetchCategory', async() =>
{
    const response = await axios.get(`${baseURL}/categories`)
    return response.data.payload.allCategoriesOnPage
})
export const createCategory = createAsyncThunk('categories/createCategory', async(category:Partial<category> ) =>
{
  const response = await  axios.post(`${baseURL}/categories`,{name: category.name})
   return response.data
})
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async(id:string) =>
{
  const response = await  axios.delete(`${baseURL}/categories/${id}`)
  return id
})
export const updateCategory = createAsyncThunk('categories/updateCategory', async(category:Partial<category> ) =>
{
  const id =category._id
  const response = await  axios.put(`${baseURL}/categories/${id}`,{name:category.name})
  return response.data
})



export type categoryState = {
  categoryArray: category[]
  error: null | string
  isLoading: boolean
  categoryData: category | null
  selectedCategoryId: number | null // `null` when no category is selected
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
},
  extraReducers(builder){
    builder.addCase(fetchCategory.fulfilled, (state,action) => {
      state.categoryArray = action.payload
      state.isLoading = false
    })
    builder.addCase(createCategory.fulfilled, (state,action) => {
     try {
      state.categoryArray.push(action.payload.payload )
      // localStorage.setItem('categories', JSON.stringify(state.categoryArray))
      // state.categoryData =action.payload
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
      const {id , name} = action.payload
      const foundCategory = state.categoryArray.find((category) =>category._id === id)
      if(foundCategory){
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
export const { sortCategoryByName, categoryRequest, categoriesSuccess } = categorySlice.actions

export default categorySlice.reducer



