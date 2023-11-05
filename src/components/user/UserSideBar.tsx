import { useNavigate } from "react-router-dom"

import profilePicture from '../../profilePicture.jpg';
import useUserState from "../Hooks/useUserState";


const UserSideBar =()=> {

  const {userData} = useUserState()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/dashboard/user/profile');
  };


  return (
<>
<aside >
<div onClick={handleClick} className="closeProfile">
<div className="downProfile">
  <img src={profilePicture} alt="pictureProfile" />
  </div>
  <h4 >{userData?.firstName}</h4>
  <div>
  </div>
</div>
</aside>
</>  )
}

export default UserSideBar