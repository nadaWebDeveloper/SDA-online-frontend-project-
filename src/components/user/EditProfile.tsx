import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";


import { useDispatch} from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateUser} from '../../redux/slices/user/userSlice'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes , faEdit} from "@fortawesome/free-solid-svg-icons";


const EditProfile = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state); // Check if id is present

    const [firstName, setFirstName] = useState(state.firstName)
    const [lastName, setLastName] = useState(state.lastName)
    const [email, setEmail] = useState(state.email)


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
  };
    
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

<section> 
  <form onSubmit={handleSubmit}>
  <div className="inputField">
    <input type="text"  name="firstName"  placeholder="first Name" value={firstName} onChange={handleInputChange}/>
    </div>
    <div className="inputField"> 
    <input type="text"  name="lastName" placeholder="last Name" value={lastName} onChange={handleInputChange}/>
    </div>
    <div className="inputField"> 
    <input type="email"  name="email" placeholder="Email" value={email} onChange={handleInputChange}/>
    </div>

    <button type="submit">
    <FontAwesomeIcon icon={faEdit} />
    </button>
    </form>
    </section>
  </div>
</div>

</>  
)}

export default EditProfile