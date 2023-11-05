import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchProducts = createAsyncThunk('users/fetchProducts', async() =>
{
  try {
  const response = await api.get('/mock/e-commerce/products.json')
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


export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
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
      state.searchTerm = action.payload
    },
   findProductById: (state, action) =>  
    {
          // console.log(action.payload);
    const id = action.payload
          
          // const name = action.payload

    const foundSingleProduct = state.products.find((product) => product.id === id )
    if(foundSingleProduct)
    {
      state.singlePageProduct = foundSingleProduct

    }
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
   addNewProduct: (state, action) =>{

    console.log(action.payload);
    state.products.push(action.payload)
    state.productData = action.payload   


  },

  deleteProduct :(state, action) =>{

    const filterProduct= state.products.filter((product) => product.id !== action.payload)
    state.products = filterProduct

  },
  updateProduct: (state, action) => {
   
    const {id,name , image ,description, categories, variants, sizes, price } = action.payload; 
    console.log(action.payload);
      const categoryExist = state.products.find((product)=> product.id === id)
      console.log(categoryExist);
    if(categoryExist){
      categoryExist.name = name 
      categoryExist.image =image
      categoryExist.description = description
      categoryExist.categories = categories
      categoryExist.variants = variants
      categoryExist.sizes = sizes
      categoryExist.price = price
    }

    state.productData = action.payload   
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
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accured'
      state.isLoading = false
    });


  }
})
export const { findProductById, searchProduct, sortProducts , productsRequest , productsSuccess , addNewProduct , deleteProduct ,updateProduct } = productSlice.actions

export default productSlice.reducer























// export type Product = {
//   id: number
//   name: string
//   image: string
//   description: string
//   categories: number[]
//   variants: string[]
//   sizes: string[]
// }

// export type ProductState = {
//   items: Product[]
//   error: null | string
//   isLoading: boolean
// }

// const initialState: ProductState = {
//   items: [],
//   error: null,
//   isLoading: false
// }

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     productsRequest: (state) => {
//       state.isLoading = true
//     },
//     productsSuccess: (state, action) => {
//       state.isLoading = false
//       state.items = action.payload
//     },
//     addProduct: (state, action: { payload: { product: Product } }) => {
//       // let's append the new product to the beginning of the array
//       state.items = [action.payload.product, ...state.items]
//     },
//     removeProduct: (state, action: { payload: { productId: number } }) => {
//       const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
//       state.items = filteredItems
//     }
//   }
// })
// export const { removeProduct, addProduct, productsRequest, productsSuccess } = userSlice.actions

// export default userSlice.reducer
