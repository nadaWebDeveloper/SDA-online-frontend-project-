import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import useUserState from "../Hooks/useUserState";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { clearError } from "../../redux/slices/user/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import profilePicture from '../../profilePicture.jpg';




const UserProfile = () => {

const navigate = useNavigate()
const {userData, error} = useUserState()
const {_id, firstName, lastName, email  } = userData || {};

 const dispatch = useDispatch<AppDispatch>()

 useEffect(() => {
  if(error){
 alert(error)
 setTimeout(()=>{
   dispatch(clearError())    
       }, 1000)
  }
}, [error])

  const handleClick = () => {
    navigate('/dashboard/user');
  };

 

  return (

<div className="upc">
<FontAwesomeIcon icon={faTimes} onClick={handleClick} className="closeProfile"/>
  <div className="grad">
    <p>profile</p>
  </div>
  <div className="downProfile">
  <img src={profilePicture} alt="pictureProfile" />
    <div className="titleProfile"><b>{firstName}  {lastName}</b></div>
    <div className="descriptProfile">{email}</div>


    <Link to="/dashboard/user/editProfile" state={{_id, firstName, lastName, email }}>
    <FontAwesomeIcon icon={faEdit}  className="closeProfile"/>
    </Link> 

  </div>
</div>
 )
}

export default UserProfile