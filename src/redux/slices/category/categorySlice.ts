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
  categoryData: category | null
  selectedCategoryId: number | null; // `null` when no category is selected
  // ... any other state properties
}


const data= localStorage.getItem('categories') !== null 
? JSON.parse(String(localStorage.getItem('categories')))
: []

const initialState: categoryState = {
  categories: [],
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
      state.categories = action.payload
    },
    sortCategoryByName: (state, action) => {

      const sortCategory = action.payload
    if(sortCategory === state.categories){
      state.categories.sort((a, b) => a.name.localeCompare(b.name))
    }

    },
    addCategory: (state, action) =>{

      console.log(action.payload);
      state.categories.push(action.payload)
      localStorage.setItem('categories', JSON.stringify(state.categories))
      state.categoryData =action.payload

    },

    deleteCategory :(state, action) =>{

      const filterCategory= state.categories.filter((category) => category.id !== action.payload)
      state.categories = filterCategory
      localStorage.setItem('categories', JSON.stringify(state.categories)) 
      state.categoryData =action.payload


    },
    updateCategory: (state, action) => {
      const {id,name } = action.payload; 
      console.log(action.payload);
        const categoryExist = state.categories.find((category)=> category.id === id)
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
      state.categories = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accrued'
      state.isLoading = false
    })

  }
})
export const { sortCategoryByName, categoryRequest, categoriesSuccess,addCategory, deleteCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer



