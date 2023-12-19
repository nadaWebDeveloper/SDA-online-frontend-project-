import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'




export const baseURL =`http://localhost:5050`
export const fetchProducts = createAsyncThunk('users/fetchProducts', async() =>
{
  try {
  const response = await axios.get(`${baseURL}/products`)
  if (!response) {
    throw new Error('Network response error');
  }
  return response.data.payload.products.allProductOnPage

} 
  
catch (error) {
  //checking if there is any issue when fetch process
console.log(error) 
}
})
export const SingleProducts = createAsyncThunk('users/SingleProducts', async(id: string) =>{
try {
  const response = await axios.get(`${baseURL}/products/${id}`)
  return response.data.payload
} catch (error) {
  console.log(error) 
}

})
export const createProduct =  async (newData: FormData) =>{
  const response = await  axios.post(`${baseURL}/products`,newData)
  //console.log(response.data);
  return response.data
}
export const updatedProduct =  async (id: string, newData: FormData) =>{
  const response = await  axios.put(`${baseURL}/products/${id}`, newData)
  return response.data
}
//http://localhost:5050/products?page=3&rangeId=range4&limit=3&search=nada&sortName=price&sortNum=1
export const sortedProduct =  async (sortName: string) =>{
  const response = await  axios.get(`${baseURL}/products?sortName=${sortName}&sortNum=1`)
  return response.data.payload.products.allProductOnPage
}
export const searchedProduct =  async (searched: string) =>{
  const response = await  axios.get(`${baseURL}/products?search=${searched}`)
  return response.data.payload.products.allProductOnPage
}




export type Product = {
  _id: string
  name: string
  price: number
  image: string
  quantity: number
  sold: number
  categories: string[]
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
}

const dataReLoad = localStorage.getItem('products') !== null 
? JSON.parse(String(localStorage.getItem('products')))
: []

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  productData: dataReLoad.productData,
  singlePageProduct: {} as Product
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
    searchProduct:(state, action)=> {
      //  state.searchTerm = action.payload
      //  console.log( 'state.searchTerm', state.searchTerm  );
      //  console.log('action.payload',action.payload);
      // const response = await  axios.get(`${baseURL}/products?search=${action}`)
      // return response.data.payload.products.allProductOnPage
    },
   findProductById:  (state, action) =>  
    {
    // const id = action.payload
          
    // const foundSingleProduct = state.products.find((product) => product.id === id )
    // if(foundSingleProduct)
    // {
    //   state.singlePageProduct = foundSingleProduct
    // }
    const id = action.payload
    SingleProducts(id)
    // const singleProduct =  api.get(`http://localhost:5050/products/${id}`)
    // console.log("singleProduct",singleProduct);

    // console.log("singleProduct",singleProduct.data.payload);

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

  deleteProduct :(state, action) =>{

    // const filterProduct= state.products.filter((product) => product.id !== action.payload)
    // state.products = filterProduct
    const id = action.payload
    axios.delete(`http://localhost:5050/products/${id}`)
    //window.location.reload()
    fetchProducts()

  },
  updateProduct: (state, action) => {
    // const {id,name , image ,description, categories, variants, sizes, price } = action.payload; 
    // console.log(action.payload);
    //   const categoryExist = state.products.find((product)=> product.id === id)
    //   console.log(categoryExist);
    // if(categoryExist){
    //   categoryExist.name = name 
    //   categoryExist.image =image
    //   categoryExist.description = description
    //   categoryExist.categories = categories
    //   categoryExist.variants = variants
    //   categoryExist.sizes = sizes
    //   categoryExist.price = price
    // }
    // state.productData = action.payload   
    const id = action.payload._id
    axios.put(`http://localhost:5050/products/${id}`)
    window.location.reload()
    fetchProducts()
},
  },
  extraReducers(builder){
    builder.addCase(fetchProducts.pending, (state)=> {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchProducts.fulfilled, (state,action) => {
      state.products = action.payload
      state.isLoading = false
    })
    builder.addCase(SingleProducts.fulfilled, (state,action) => {
      state.singlePageProduct = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accrued'
      state.isLoading = false
    });


  }
})
export const { findProductById, searchProduct, sortProducts , productsRequest , productsSuccess , deleteProduct ,updateProduct } = productSlice.actions

export default productSlice.reducer