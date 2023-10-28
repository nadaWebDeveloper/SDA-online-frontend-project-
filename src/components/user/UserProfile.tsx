import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import profilePicture from '../../profilePicture.jpg';
import { useNavigate } from "react-router";
import { FaShapes} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";



const UserProfile = () => {

  const navigate = useNavigate()
  const {userData} = useSelector((state: RootState) => state.usersReducer)

  const handleClick = () => {
    navigate('/dashboard/user');
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
    <div className="titleProfile"><b>{userData?.firstName}  {userData?.lastName}</b></div>
    <div className="descriptProfile">{userData?.email}</div>
  </div>
</div>

</>  )
}

export default UserProfile