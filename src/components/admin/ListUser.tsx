import AdminSideBar from "./AdminSideBar"
import { useDispatch, useSelector } from "react-redux"
import { ChangeEvent, useEffect } from "react"

import { AppDispatch, RootState } from '../../redux/store'
import { blockUser, deleteUser, fetchUser, searchUser } from '../../redux/slices/user/userSlice'
import { FaEdit } from "react-icons/fa";
import Search from "../Filtering/Search"


const ListUser = () => {

    const {users, isLoading, error , searchTerm} = useSelector((state: RootState) => state.usersReducer)
    const Dispatch: AppDispatch = useDispatch()
   
    useEffect(() => {
     Dispatch(fetchUser())
    }, [])
   
    if(isLoading)
    {return <h1>loading ...</h1>}
    if(error)
    {return <h1>{error}</h1>}

    const handleSearch =(event: ChangeEvent<HTMLInputElement>)=>{
      const inputValue = event.target.value
      Dispatch(searchUser(inputValue))
    }
    
    const searchUsers = searchTerm
    ? users.filter((user) => user.firstName.toLowerCase().includes
    (searchTerm.toLowerCase()))
    : users


     const handleDelete =(id: number)=>{
    
      Dispatch(deleteUser(id))
    }

    const handleBlack =(id: number)=>{
      Dispatch(blockUser(id))
    
    }
   
  return (
<>

<AdminSideBar />
<Search searchTerm= {searchTerm} handleSearch={handleSearch}/>
      <div className="mainContent">
      <h2>List all the User here </h2> 
      </div>
 
 {searchUsers.length > 0 ?(   
      
      searchUsers.map((user)=> {
      const { id,firstName,lastName,email,role, ban} = user
    if(user.role !== 'admin') {  //this condition for display only user on dashboard admin 
      return(
        <div className="category" key={id}>
            <h2 className="product-brand">{`${firstName} ${lastName}`}</h2>
            <h4 className="product-brand">{role}</h4>           
             <h3 className="product-brand">{email}</h3>
             <button onClick={()=> {handleDelete(id)}} >Delete</button>     
              {/* to delete user from database */}
              <button onClick={()=> {handleBlack(id)}} >
                {ban ? 'unban' : 'ban'}
                </button>     
            <button ><FaEdit /></button> 
            </div>
      )
    }
     })):(  <h1>Not Add User Yet ... </h1>)}  
 
  
</>  )
}

export default ListUser