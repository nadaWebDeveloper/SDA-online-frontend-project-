import { Link } from "react-router-dom"
import useUserState from "../Hooks/useUserState"

const AdminSideBar = () => {

  const {userData} = useUserState()

  return (

<>




<div className="">
  <span><h1>{userData?.role}  : {userData?.firstName}</h1></span>
</div> 

  <ul>
  <li>
      <Link to='/dashboard/admin/users'>Users</Link>
    </li>
    <li>
      <Link to='/dashboard/admin/category'>Category</Link>
    </li>
    <li>
      <Link to='/dashboard/admin/products'>Products</Link>
    </li>
    <li>
      <Link to='/dashboard/admin/orders'>Orders</Link>
    </li>
  </ul>

 
  </>  )
}

export default AdminSideBar