import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// axios.defaults.withCredentials = true


const baseURL =`http://localhost:5050`
export type user = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  isBanned: boolean
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

}
//set the data in the local storage if user refresh the page keep logged in (fetch data)
const dataReLoad = localStorage.getItem('loginData') !== null 
? JSON.parse(String(localStorage.getItem('loginData')))
: []

export const fetchUser = createAsyncThunk('users/fetchUser', async() =>
{
  const response = await axios.get(`${baseURL}/users`)
  return response.data.allUsers
})
export const registerUser  =  async (newUser: {}) =>{
  const response = await  axios.post(`${baseURL}/users/register`,newUser)
  return response.data
}
export const activateUser  =  async (token: string) =>{
  const response = await  axios.post(`${baseURL}/users/activate`,{token})
  return response.data
}
export const logInUser  =  async (newUser: {}) =>{
  const response = await  axios.post(`${baseURL}/auth/login`,newUser)
  return response.data
}
export const logOutUser  = createAsyncThunk('users/logOutUser',async () =>{
  const response = await  axios.post(`${baseURL}/auth/logout`)
  return response.data
})
// export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string, {rejectWithValue}) =>{
//    try {
//     await  axios.delete<user[]>(`${baseURL}/users/${id}`)
//     return id
//    } catch (error) {
//     return rejectWithValue(error.response.data.msg)
//    }
// })
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) =>{
  try {
   await  axios.delete<user[]>(`${baseURL}/users/${id}`)
   return id
  } catch (error) {
   return error
  }
})
export const blockedUser =  async (id: string) =>{
  const response = await  axios.put(`${baseURL}/users/ban/${id}`)
  return response.data
}
export const unBlockedUser =  async (id: string) =>{
  const response = await  axios.put(`${baseURL}/users/unban/${id}`)
  return response.data
}
export const forgetPassword = createAsyncThunk('users/forgetPassword', async (email: string) =>{
  const response = await  axios.post(`${baseURL}/users/forget-password`,{email: email})
  return response.data
})
export const resetPassword = createAsyncThunk('users/resetPassword', async (dataReLoad: object) =>{
  // const response = await  axios.put(`${baseURL}/users/reset-password`,{
  //   password: dataReLoad.password,
  //   token: dataReLoad.token
  // })
  // return response.data
})
export const updateUser  =  createAsyncThunk('users/updateUser',async (userData: user ) =>{
  // userData: Object
 await  axios.put(`${baseURL}/users/${userData._id}`, userData)
  return userData
})

const initialState: userState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: dataReLoad.isLoggedIn,
  userData: dataReLoad.userData,
  searchTerm: '',
  ban: false
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

//     updateUser: (state, action) => {
//       const {id, firstName, lastName, email} = action.payload; 
//       console.log(action.payload);
//         const userExist = state.users.find((user)=> user.id === id)
//         console.log(userExist);
//       if(userExist){
//         userExist.firstName = firstName 
//         userExist.lastName = lastName 
//         userExist.email = email 
//       }
//       state.userData = action.payload
// },

  },
  extraReducers(builder){
    builder.addCase(fetchUser.fulfilled, (state,action) => {
      state.users = action.payload
      state.isLoading = false
    })
    // builder.addCase(deleteUser.fulfilled, (state,action) => {
    //   state.users = state.users.filter((user) => user._id !== action.payload)
    //   state.isLoading = false
    // })
    // builder.addCase(blockUser.fulfilled, (state,action) => {
    //   const foundUser = state.users.find((user) => user._id === action.payload)
    //   if(foundUser){
    //     foundUser.isBanned = true
    //   }
    // })
    // builder.addCase(unBlockUser.fulfilled, (state,action) => {
    //   const foundUser = state.users.find((user) => user._id === action.payload)
    //   if(foundUser){
    //     foundUser.isBanned = false
    //   }
    // })
    // builder.addCase(logInUser.fulfilled, (state,action) => {
    //   state.isLoggedIn = true
    //   state.userData = action.payload
    //    //when log in save data in local Storage 
    //    localStorage.setItem('loginData', JSON.stringify({
    //     isLoggedIn: state.isLoggedIn,
    //     userData: state.userData
    //   }))
    // })
    // builder.addCase(logOutUser.fulfilled, (state,action) => {
    //   state.isLoggedIn = false
    //   state.userData = null
    //    //when log out reset data in local Storage 
    //    localStorage.setItem('loginData', JSON.stringify({
    //     isLoggedIn: state.isLoggedIn,
    //     userData: state.userData
    //   }))
    // })
    // builder.addCase(updateUser.fulfilled, (state,action) => {
    //   if(state.userData){
    //    state.userData.firstName = action.payload.firstName
    //    localStorage.setItem('loginData', JSON.stringify({
    //     isLoggedIn: state.isLoggedIn,
    //     userData: state.userData
    //   }))}
    // })
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
export const {searchUser ,userSuccess} = userSlice.actions

export default userSlice.reducer




