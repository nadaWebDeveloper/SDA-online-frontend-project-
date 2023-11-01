import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch} from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {FaEdit} from 'react-icons/fa'
import { AppDispatch } from "../../redux/store";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateUser} from '../../redux/slices/user/userSlice'


const EditProfile = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state); // Check if id is present

    const [firstName, setFirstName] = useState(state.firstName)
    const [lastName, setLastName] = useState(state.lastName)
    const [email, setEmail] = useState(state.email)


  const handleInputChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value

    setFirstName(valueInput)
   
  }

  const handleInputChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value
    setLastName(valueInput)
   
  }

  const handleInputChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value
    setEmail(valueInput)
   
  }
    
     const handleSubmit =  (event: FormEvent) =>
     {
      event.preventDefault();

      if(confirm("Are you sure to edit profile")){

        const updateUserinfo = {
          id: state.id,
          firstName: firstName,
          lastName: lastName,
          email: email
        };
        console.log(updateUserinfo); // Check if id is present
       dispatch(updateUser(updateUserinfo));
        navigate('/dashboard/user');
        alert('success edited profile');
        
        }else{
          return false;
      }
     }             

     const handleClick = () => {

        navigate('/dashboard/user');
      };



  return (
<>  

    <div className="upc">
<FontAwesomeIcon icon={faTimes} onClick={handleClick} className="closeProfile"/>
  <div className="grad">
  <h2>Edit Profile</h2>
  </div>
  <div className="downProfile">

  <form onSubmit={handleSubmit}>
    <input type="text"  name="firstName"  placeholder="first Name" value={firstName} onChange={handleInputChangeFirstName}/>
    <input type="text"  name="lastName" placeholder="last Name" value={lastName} onChange={handleInputChangeLastName}/>
    <input type="email"  name="email" placeholder="Email" value={email} onChange={handleInputChangeEmail}/>

    <button type="submit"><FaEdit /></button>
    </form>

  </div>
</div>

</>  
)}

export default EditProfile