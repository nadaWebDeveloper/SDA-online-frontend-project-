import AdminSideBar from "./AdminSideBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { AppDispatch, RootState } from '../../redux/store'
import { fetchUser } from '../../redux/slices/user/userSlice'
import { FaEdit } from "react-icons/fa";


const ListUser = () => {

    const {users, isLoading, error} = useSelector((state: RootState) => state.usersReducer)
    const Dispatch: AppDispatch = useDispatch()
   
    useEffect(() => {
     Dispatch(fetchUser())
    }, [])
   
    if(isLoading)
    {return <h1>loading ...</h1>}
    if(error)
    {return <h1>{error}</h1>}
   
  return (
<>

<AdminSideBar />
      <div className="mainContent">
      <h2>List all the User here </h2> 
      </div>
 
 {users.length > 0 ?(   
      
      users.map((user)=> {
      const { id,firstName,lastName,email,role} = user
      return(
        <div className="category" key={id}>
            <h2 className="product-brand">{`${firstName} ${lastName}`}</h2>
            <h4 className="product-brand">{role}</h4>           
             <h3 className="product-brand">{email}</h3>
             <button >Delete</button>
            <button ><FaEdit /></button> 
            </div>
      ) 
     })):(  <h1>Not Add User Yet ... </h1>)}  
 
  
</>  )
}

export default ListUser