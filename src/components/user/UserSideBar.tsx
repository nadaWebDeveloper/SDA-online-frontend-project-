import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../redux/store"

const UserSideBar =()=> {
  const {userData} = useSelector((state: RootState) => state.usersReducer)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/dashboard/user/profile');
  };


  return (
<>
<aside className="sidebar">
<div>
  <h4 onClick={handleClick} className="closeProfile">{userData?.firstName}</h4>
</div>

<ul>
  <li>
  <Link to='/dashboard/user/orders'>Order</Link>
  </li>
</ul>
</aside>
</>  )
}

export default UserSideBar