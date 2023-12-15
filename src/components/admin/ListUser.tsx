import { useDispatch } from "react-redux"
import { ChangeEvent, useEffect } from "react"

import { AppDispatch } from '../../redux/store'
import { blockedUser, deleteUser, fetchUser, searchUser, unBlockedUser } from '../../redux/slices/user/userSlice'

import Search from "../Filtering/Search"
import useUserState from "../Hooks/useUserState"


const ListUser = () => {

    const {users, isLoading, error , searchTerm} = useUserState()
    const dispatch = useDispatch< AppDispatch >()
   
    useEffect(() => {
      dispatch(fetchUser())
    }, [])

    const handleSearch =(event: ChangeEvent<HTMLInputElement>)=>{
      const inputValue = event.target.value
      dispatch(searchUser(inputValue))
    }
    
    const searchUsers = searchTerm
    ? users.filter((user) => user.firstName.toLowerCase().includes 
    (searchTerm.toLowerCase()))
    : users
    // ? users.filter((user) => user.lastName.toLowerCase().includes  
    // || user.email.toLowerCase().includes
    // (searchTerm.toLowerCase()))
    // : users
    // ? users.filter((user) =>  user.email.toLowerCase().includes 
    // (searchTerm.toLowerCase()))
    // : users


     const handleDelete = async(_id: string)=>{
      if(confirm("Are you sure to Delete user?")){
           try {
            const response = await deleteUser(_id)
            dispatch(fetchUser())
            //to use message from back-end
            alert('success deleted user');
            console.log(response)
           
           } catch (error) {
            //to use error message from back-end
           //const err = error.response.data.msg
           alert(error);
           }

      }else{
        return false;
    }}

    const handleBlock = async(id: string, isBanned: boolean)=>{
      if(confirm("Are you sure to block user")){
        try {
          const response = isBanned ?  await unBlockedUser(id) : await blockedUser(id)
          alert(response.message);
          console.log('handleBlock',response.message);
          dispatch(fetchUser())
        } catch (error) {
          console.log(error);
        }
      }else{
        return false;
    }}

    if(isLoading)
    {return <h1>loading ...</h1>}
    if(error)
    {return <h1>{error}</h1>}
    
   
  return (
<div>
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
     // if(user.isAdmin === true) {
            return (
              <tr key={_id}>
                <td>
                {`${firstName} ${lastName}`}
                </td>
                <td>{email}</td>
                <td>{isAdmin ? 'Admin' : 'User'}</td>
                <td>
             <button onClick={()=> {handleDelete(_id)}} >Delete</button>     
                 <button onClick={()=> {handleBlock(_id, isBanned)}} >
                {isBanned ? 'unBlocked' : 'Blocked'} 
                </button>  
                </td>
              </tr>
            )
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