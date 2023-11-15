import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchUser = createAsyncThunk('users/fetchUser', async() =>
{
  try {
  const response = await api.get('/mock/e-commerce/users.json')
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

export type user = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string | number
  role: string
  ban: boolean
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
    userSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },

    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      //when log in save data in local Storage 
      localStorage.setItem('loginData', JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData
      }))
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
        //when log out reset data in local Storage 
        localStorage.setItem('loginData', JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        }))
    },
    searchUser:(state, action)=> {
      state.searchTerm = action.payload
    },
    deleteUser :(state, action) =>{

      const filterUser= state.users.filter((user) => user.id !== action.payload)
      state.users = filterUser

    },
    blockUser :(state, action) =>{
      const id = action.payload
      const findUser= state.users.find((user) => user.id === id)
      if(findUser){
        findUser.ban = !findUser.ban //flip the value
      }

    },
    registerUser: (state, action) =>{
      console.log(action.payload);
      state.users.push(action.payload)
      state.userData = action.payload

    },
    updateUser: (state, action) => {
      const {id, firstName, lastName, email} = action.payload; 
      console.log(action.payload);
        const userExist = state.users.find((user)=> user.id === id)
        console.log(userExist);
      if(userExist){
        userExist.firstName = firstName 
        userExist.lastName = lastName 
        userExist.email = email 

      }

      state.userData = action.payload

},

  },
  extraReducers(builder){
    builder.addCase(fetchUser.pending, (state)=> {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchUser.fulfilled, (state,action) => {
      state.users = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message || 'An Error accrued'
      state.isLoading = false
    })

  }
})
export const { login ,logout ,searchUser ,deleteUser , blockUser ,registerUser , updateUser ,userRequest ,userSuccess } = userSlice.actions

export default userSlice.reducer




