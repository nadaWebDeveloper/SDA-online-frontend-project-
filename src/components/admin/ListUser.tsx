import AdminSideBar from "./AdminSideBar"
import { useDispatch } from "react-redux"
import { ChangeEvent, useEffect } from "react"

import { AppDispatch } from '../../redux/store'
import { blockUser, deleteUser, fetchUser, searchUser } from '../../redux/slices/user/userSlice'
import { FaEdit } from "react-icons/fa";
import Search from "../Filtering/Search"
import useUserState from "../Hooks/useUserState"


const ListUser = () => {

    const {users, isLoading, error , searchTerm} = useUserState()
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
    
      if(confirm("Are you sure to Delete user")){
        Dispatch(deleteUser(id))
        alert('success deleted user');

      }else{
        return false;
    }}

    const handleBlock =(id: number)=>{
     
      if(confirm("Are you sure to block user")){
        Dispatch(blockUser(id))
        alert('success blocked user');

      }else{
        return false;
    
    }}

    
   
  return (
<>

<div className="sectionAdmin">
  <AdminSideBar />
</div>


<div className="filter">
<Search searchTerm= {searchTerm} handleSearch={handleSearch}/>
</div>


      <div className="mainContent">
      <h2>List all the User here </h2> 
      </div>

 <div className="contentUser">
 <div className="user">

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
              <button onClick={()=> {handleBlock(id)}} >
                {ban ? 'unban' : 'ban'}
                </button>     
            <button ><FaEdit /></button> 
            </div>
      )
    }
     })
     ):(  <h1>Not Add User Yet ... </h1>)}
 </div>  
 </div>
 
</>  )
}

export default ListUser