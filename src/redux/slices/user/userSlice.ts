import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
axios.defaults.withCredentials = true


const baseURL =`http://localhost:5050`
export type user = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin?: boolean
  isBanned?: boolean
  balance: number
}
export type userState = {
  users: user[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: user | null
  searchTerm: string
  ban: boolean
  state: string
}
//set the data in the local storage if user refresh the page keep logged in (fetch data)
const dataReLoad = localStorage.getItem('loginData') !== null 
? JSON.parse(String(localStorage.getItem('loginData')))
: []

export const fetchUser = createAsyncThunk('users/fetchUser', async(_, { rejectWithValue }) =>
{
 try {
   const response = await axios.get(`${baseURL}/users`)
   return response.data.allUsers
 } catch (error) {
  if(axios.isAxiosError(error) && error.response?.data?.msg){
    return rejectWithValue(error.response?.data?.msg)
  } }
})
export const SingleUser = createAsyncThunk('users/SingleUser', async(id: string ,{rejectWithValue}) =>{
  try {
    const response = await axios.get(`${baseURL}/users/profile/${id}`)
    console.log('single user',response);
    return response.data.payload
  } catch (error) {
  return rejectWithValue(error)
  }
  
})
export const registerUser  = createAsyncThunk('users/registerUser', async (newUser: {}, {rejectWithValue}) =>{
 try {
  const response = await  axios.post(`${baseURL}/users/register`,newUser)
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
export const logInUser  = createAsyncThunk('users/logInUser', async (user:Partial<user> , {rejectWithValue}) =>{
 try {
   const response = await  axios.post(`${baseURL}/auth/login`,
   {
     email: user.email,
     password: user.password
   })
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
export const logOutUser  = createAsyncThunk('users/logOutUser',async (_, { rejectWithValue }) =>{
  try {
     const response = await  axios.post(`${baseURL}/auth/logout`)
    return response.data
  } catch (error) {
    if(axios.isAxiosError(error) && error.response?.data?.errors){
      const errorData = error.response.data.errors
      return rejectWithValue(`${errorData.message}`)
    }
    if(axios.isAxiosError(error) && error.response?.data?.msg){
      return rejectWithValue(error.response?.data?.msg)
    } 
    if(axios.isAxiosError(error) && error.response?.data?.payload?.message){
      return rejectWithValue(error.response?.data?.payload?.message)
    }
   }
})
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string, {rejectWithValue}) =>{
  try {
     await  axios.delete<user[]>(`${baseURL}/users/${id}`)
     return id
  } catch (error) {
    if(axios.isAxiosError(error) && error.response?.data?.errors){
      const errorData = error.response.data.errors
      return rejectWithValue(`${errorData.message}`)
    }
    if(axios.isAxiosError(error) && error.response?.data?.msg){
      return rejectWithValue(error.response?.data?.msg)
    }  }
})
export const blockedUser = createAsyncThunk('users/blockedUser', async (id: string, {rejectWithValue}) =>{
 try {
   await  axios.put(`${baseURL}/users/ban/${id}`)
   return  id 
 } catch (error) {
  return rejectWithValue(error)
 }
})
export const unBlockedUser = createAsyncThunk('users/unBlockedUser', async (id: string, {rejectWithValue}) =>{
 try {
   await  axios.put(`${baseURL}/users/unban/${id}`)
   return id 
 } catch (error) {
  return rejectWithValue(error)
 }
})
export const grantRoleUser = createAsyncThunk('users/grantRoleUser', async (id: string, {rejectWithValue}) =>{
  try {
    await  axios.put(`${baseURL}/users/adminRole/${id}`)
    return  id 
  } catch (error) {
   return rejectWithValue(error)
  }
})
export const forgetPassword = createAsyncThunk('users/forgetPassword', async (email: string , {rejectWithValue}) =>{
try {
    const response = await  axios.post(`${baseURL}/users/forget-password`,{email: email})
    alert(response.data.message)
    return response.data
} catch (error) {
 return rejectWithValue(error) 
}
})
export const resetPassword = createAsyncThunk('users/resetPassword', async (data: {password:string , token: string | undefined} , {rejectWithValue}) =>{
try {
    const response = await  axios.put(`${baseURL}/users/reset-password`,{
      password: data.password,
      token: data.token
    })
    alert(response.data.message)
    return response.data
} catch (error) {
  return rejectWithValue(error) 
}
})
export const updateUser =  createAsyncThunk('users/updateUser',async (user:Partial<user> , {rejectWithValue} ) =>{
try {
    const id = user._id
   const response = await  axios.put(`${baseURL}/users/editProfile/${id}`, {
     firstName: user.firstName,
     lastName: user.lastName, 
     email:user.email ,
   })
    return response.data
} catch (error) {
  if(axios.isAxiosError(error) && error.response?.data?.errors){
    const errorData = error.response.data.errors
    return rejectWithValue(`${errorData.message}`)
  }
  if(axios.isAxiosError(error) && error.response?.data?.msg){
    return rejectWithValue(error.response?.data?.msg)
  }}
})
export const activateUser  =  async (token: string) =>{
  try {
    const response = await  axios.post(`${baseURL}/users/activate`,{token})
    return response.data
  } catch (error) {
   throw error
  }
 }


const initialState: userState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: dataReLoad.isLoggedIn,
  userData: dataReLoad.userData,
  searchTerm: '',
  ban: false,
  state: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequest: (state) => {
      state.isLoading = true
    },
    clearError: (state) => {
      state.error= null
    },
    searchUser:(state, action)=> {
      state.searchTerm = action.payload
    },
    userSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
  },
  extraReducers(builder){
    builder.addCase(fetchUser.fulfilled, (state,action) => {
      state.users = action.payload
      state.isLoading = false
    })
    builder.addCase(SingleUser.fulfilled, (state,action) => {
      state.userData = action.payload
      state.isLoading = false
    })
    builder.addCase(registerUser.fulfilled, (state,action) => {
      try {
       state.users.push(action.payload)
       const msg = action.payload.message
       alert(msg)
      } catch (error) {
       console.log(error);
      }
     }) 
    builder.addCase(deleteUser.fulfilled, (state,action) => {
      state.users = state.users.filter((user) => user._id !== action.payload)
      state.isLoading = false
    })
    builder.addCase(blockedUser.fulfilled, (state,action) => {
      const foundUser = state.users.find((user) => user._id === action.payload)
      if(foundUser){
        foundUser.isBanned = true
      }
      //alert(action.payload.message)
    })
    builder.addCase(unBlockedUser.fulfilled, (state,action) => {
      const foundUser = state.users.find((user) => user._id === action.payload)
      if(foundUser){
        foundUser.isBanned = false
      }
      //alert(action.payload.message)
    })
    builder.addCase(grantRoleUser.fulfilled, (state,action) => {
      const foundUser = state.users.find((user) => user._id === action.payload)
      if(foundUser){
        foundUser.isAdmin = true
      }
    })
    builder.addCase(logInUser.fulfilled, (state,action) => {
      state.isLoggedIn = true
      state.userData = action.payload.user
      alert(action.payload.message);
       //when log in save data in local Storage 
       localStorage.setItem('loginData', JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData
      }))
    })
    builder.addCase(logOutUser.fulfilled, (state,action) => {
      state.isLoggedIn = false
      state.userData = null
      console.log(action);
      alert(action.payload.message);
       //when log out reset data in local Storage 
       localStorage.setItem('loginData', JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData
      }))
    })
    builder.addCase(updateUser.fulfilled, (state,action) => {
    if(state.userData){
    state.userData = action.payload.user
    state.isLoading = false
    localStorage.setItem('loginData', JSON.stringify({
    isLoggedIn: state.isLoggedIn,
    userData: state.userData
    }))
      const msg = action.payload.message
      alert(msg)
     }
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
        state.error = action.payload   || 'An Error accrued'
      })
  }
})
export const {searchUser ,userSuccess, clearError} = userSlice.actions

export default userSlice.reducer




