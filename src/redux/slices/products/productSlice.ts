import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { category } from '../category/categorySlice'



export const baseURL =`http://localhost:5050`
//  const baseURL = import.meta.env.BASE_URL
 export type Product = {
  _id: string
  name: string
  price: number
  image?: string | undefined | File
  quantity: number
  sold: number
  categories: category
  description: string
  createAt?: Date
  updateAt?: Date
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  productData: Product | null
  singlePageProduct: Product
  pagination: {
  currentPage : number,
  totalPage : number, 
  totalProduct : number,
  limit : number ,
   page : number},
   rangeId: string
}

const dataReLoad = localStorage.getItem('products') !== null 
? JSON.parse(String(localStorage.getItem('products')))
: []

//http://localhost:5050/products?page=3&rangeId=range4&limit=3&search=nada&sortName=price&sortNum=1
export const fetchProducts = createAsyncThunk('products/fetchProducts', async(data:{page: number ; limit: number, rangeId: string, search: string}, {rejectWithValue}) =>
{
  try {
  const response = await axios.get(`${baseURL}/products?page=${data.page}&rangeId=${data.rangeId}&limit=${data.limit}&search=${data.search}`)
  if (!response) {
    throw new Error('Network response error');
  }
  return response.data
} 
  
catch (error) {
  if(error.response.data.errors){
    return rejectWithValue(error.response?.data?.errors)
  }
  if(error.response.data.msg){
    return rejectWithValue(error.response?.data?.msg)
  } }
})
export const SingleProducts = createAsyncThunk('products/SingleProducts', async(id: string ,{rejectWithValue}) =>{
try {
  const response = await axios.get(`${baseURL}/products/${id}`)
  return response.data.payload
} catch (error) {
return rejectWithValue(error)
}

})
export const createProduct =  createAsyncThunk('products/createProduct', async (newData: FormData ,{rejectWithValue}) =>{
 try {
   const response = await  axios.post(`${baseURL}/products`,newData)
   return response.data
 } catch (error) {
  if(error.response.data.errors){
    return rejectWithValue(error.response?.data?.errors)
  }
  if(error.response.data.msg){
    return rejectWithValue(error.response?.data?.msg)
  } }
})
export const deleteProduct = createAsyncThunk('products/deleteProduct', async(Product:Partial<Product>, {rejectWithValue}) =>
{
 try {
  const id = String(Product._id)
  console.log(' inside id api delete',id);
   await  axios.delete(`${baseURL}/products/${id}`)
   return id
 } catch (error) {
  return rejectWithValue(error)
 }
})
export const updatedProduct = createAsyncThunk('products/updatedProduct', async (newData: {id: string ; formData:FormData  } ,{rejectWithValue} ) =>{
 try {
   const response = await  axios.put(`${baseURL}/products/${ newData.id}`, newData.formData)
   return response.data
 } catch (error) {
  if(error.response.data.errors){
    return rejectWithValue(error.response.data.errors)
  }
  if(error.response.data.msg){
    return rejectWithValue(error.response.data.msg)
  }
 }
})
export const searchedProduct = createAsyncThunk('users/searchedProduct', async (Product:Partial<ProductState> , {rejectWithValue}) =>{
  try {
    const response = await  axios.get(`${baseURL}/products?search=${Product.searchTerm}`)
    return response.data.payload.products.allProductOnPage
  } catch (error) {
   return rejectWithValue(error)
  }
 })
export const sortedProduct =  async (sortName: string) =>{
  const response = await  axios.get(`${baseURL}/products?sortName=${sortName}&sortNum=1`)
  return response.data.payload.products.allProductOnPage
}


const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  productData: dataReLoad.productData,
  singlePageProduct: {} as Product,
  pagination: {
    currentPage : 0,
    totalPage : 0, 
    totalProduct : 0,
    limit : 0 ,
   page : 0},
   rangeId: 'range0'
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequest: (state) => {
            state.isLoading = true
          },
    productsSuccess: (state, action) => {
            state.isLoading = false
            state.products = action.payload
          },
          clearError: (state) => {
            state.error= null
          },
    sortProducts: (state, action) =>
   {
    const sortCategory = action.payload
    if(sortCategory === 'name'){
      state.products.sort((a, b) => a.name.localeCompare(b.name))
    }else if (sortCategory === 'price'){
      state.products.sort((a, b) => a.price - b.price )
    }
   },
  },
  extraReducers(builder){
    builder.addCase(fetchProducts.fulfilled, (state,action) => {
      state.products = action.payload.allProductOnPage
      const {currentPage ,totalPage , totalProduct , limit , page } = action.payload.pagination
      state.pagination = {
        currentPage : currentPage,
        totalPage : totalPage, 
        totalProduct : totalProduct,
        limit : limit,
        page: page,              
      }
      state.isLoading = false
    })
    builder.addCase(createProduct.fulfilled, (state,action) => {
      try {
       state.products.push(action.payload.newProduct) 
       const msg = action.payload.message
       alert(msg)
      } catch (error) {
       console.log(error);
      }
     }) 
    builder.addCase(updatedProduct.fulfilled, (state,action) => {
      const {_id , name , price , image ,quantity ,sold , categories , description} = action.payload.payload
      const foundProduct = state.products.find((product) =>product._id === _id)
      if(foundProduct && (name | price | image | quantity | sold | categories|description)){
        foundProduct.name = name
        foundProduct.price = price
        foundProduct.image = image
        foundProduct.quantity = quantity
        foundProduct.sold = sold
        foundProduct.categories = categories
        foundProduct.description = description
      }
      const msg = action.payload.message
      alert(msg)
    })
    builder.addCase(SingleProducts.fulfilled, (state,action) => {
      state.singlePageProduct = action.payload
      state.isLoading = false
    })
    builder.addCase(deleteProduct.fulfilled, (state,action) => {
      state.products = state.products.filter((product)=> product._id !== action.payload)
      state.isLoading = false
    }) 
    builder.addCase(searchedProduct.fulfilled, (state,action) => {
      state.searchTerm = action.payload
      state.isLoading = false
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
        state.error = action.payload || 'An Error accrued' || action.error.message 

      })


  }
})
export const {  sortProducts , productsRequest , productsSuccess, clearError } = productSlice.actions

export default productSlice.reducer