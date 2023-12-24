import { useDispatch } from "react-redux"
import { ChangeEvent, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';

import { AppDispatch } from '../../redux/store'
import { blockedUser, clearError, deleteUser, fetchUser, grantRoleUser, searchUser, unBlockedUser } from '../../redux/slices/user/userSlice'

import Search from "../Filtering/Search"
import useUserState from "../Hooks/useUserState"


const ListUser = () => {

    const {users, searchTerm, error} = useUserState()
    const dispatch = useDispatch< AppDispatch >()
   
    useEffect(() => {
      dispatch(fetchUser())
    }, [])

    useEffect(() => {
           if(error){
          // const toastId = toast(error,{
          //   onClose: () => {
          //     dispatch(clearError())
          //   }
          // })
          // setTimeout(()=>{
          //   toast.dismiss(toastId)
          // }, 1000)
          alert(error)
          setTimeout(()=>{
            dispatch(clearError())    
                }, 1000)
           }
      
    }, [error])

    const handleSearch =(event: ChangeEvent<HTMLInputElement>)=>{
      const inputValue = event.target.value
      dispatch(searchUser(inputValue))
    }
    
    const searchUsers = searchTerm
    ? users.filter((user) => user.firstName.toLowerCase().includes 
    (searchTerm.toLowerCase()))
    : users
    ? users.filter((user) => user.lastName.toLowerCase().includes  
    || user.email.toLowerCase().includes
    (searchTerm.toLowerCase()))
    : users
    ? users.filter((user) =>  user.email.toLowerCase().includes 
    (searchTerm.toLowerCase()))
    : users


     const handleDelete = async(_id: string)=>{
      if(confirm("Are you sure to Delete user?")){
            dispatch(deleteUser('987654'))
      }else{
        return false;
    }}

    const handleBlockUser = async(id: string, isBanned: boolean | undefined)=>{
      if(confirm("Are you sure to block user ?")){
       if(id && isBanned)   {        
           isBanned ?  dispatch(unBlockedUser(id)) : dispatch(blockedUser(id))
         }      }else{
        return false;
    }}

    const handleGrantRole = async(id: string, isBanned: boolean | undefined)=>{
      if(confirm("Are you sure to to upgrade role user to role Admin ?")){
       if(id && isBanned === false)   {        
           dispatch(grantRoleUser(id)) 
         }    
          }else{
        return false;
    }}
   
  return (
<div>
<ToastContainer />

<div className="filter">
<Search searchTerm= {searchTerm} handleSearch={handleSearch}/>
</div>

<div className="contentUser"> 
{searchUsers.length > 0 ? (   //{searchUsers.length > 0 ? (
  <div>
    <div className="tableDiv">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th> * </th>
          </tr>
        </thead>
        <tbody>
          {searchUsers.map((user) => {
      let { _id,firstName,lastName,email,isAdmin, isBanned} = user
      if(user.isAdmin === false) {
            return (
              <tr key={_id}>
                <td>
                {`${firstName} ${lastName}`}
                </td>
                <td>{email}</td>
                <td>{isAdmin ? 'Admin' : 'User'}</td>
                <td>
             <button onClick={()=> {handleDelete(_id)}} >Delete</button>     
                 <button onClick={()=> {handleBlockUser(_id, isBanned)}} >
                {isBanned ? 'unBlocked' : 'Blocked'} 
                </button>  
                <button onClick={()=> {handleGrantRole(_id, isBanned)}} >
                {'upgrade to admin'} 
                </button> 
                </td>
              </tr>
            )
          }
          })}
        </tbody>
      </table>
    </div>
   
  </div>
) :(<h2>Not Add User Yet ... </h2>) }
 </div>    

</div>  )
}

export default ListUser