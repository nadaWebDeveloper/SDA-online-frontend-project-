import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categoryReducer from './slices/category/categorySlice'
import userReducer from './slices/user/userSlice'
import orderReducer from './slices/orders/orderSlice'

export const store = configureStore({
  reducer: {
    productsReducer: productsReducer,
    categoriesReducer: categoryReducer,
    usersReducer: userReducer,
    orderReducer: orderReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
