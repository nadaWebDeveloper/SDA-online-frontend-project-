import ListProducts from "../product/ListProducts"
import UserSideBar from "./UserSideBar"

const UserOrders = () => {
  return (
<>
<div className="container">
  <UserSideBar />
  <div className="mainContent">
   <ListProducts />
  </div>
</div>
</> 
 )}

export default UserOrders