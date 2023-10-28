import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import profilePicture from '../../profilePicture.jpg';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import useUserState from "../Hooks/useUserState";
import { Link } from "react-router-dom";



const UserProfile = () => {

  const navigate = useNavigate()
const {userData} = useUserState()
const {id, firstName, lastName, email } = userData || {};


  const handleClick = () => {
    navigate('/dashboard/user');
  };

  const handleClickProfileEdit = () => {
    navigate('/editProfile');
  };

  return (
<>
<div className="upc">
<FontAwesomeIcon icon={faTimes} onClick={handleClick} className="closeProfile"/>
  <div className="grad">
    <p>profile</p>
  </div>
  <div className="downProfile">
  <img src={profilePicture} alt="pictureProfile" />
    <div className="titleProfile"><b>{firstName}  {lastName}</b></div>
    <div className="descriptProfile">{email}</div>

    <Link to="/editProfile" state={{id, firstName, lastName, email }}>
    <FontAwesomeIcon icon={faEdit} onClick={handleClickProfileEdit} className="closeProfile"/>
    </Link> 

  </div>
</div>

</> )
}

export default UserProfile