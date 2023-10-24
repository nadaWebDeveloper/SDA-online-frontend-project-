import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import { Outlet, useLocation } from "react-router"
import Login from "../loggin/Login"

const ProtectRouterAdmin = () => {
    const pathLocationEveryUser = useLocation()

    const {isLoggedIn , userData} = useSelector((state: RootState) => state.users)
    //عشان المستخدم لما يسجل دخول تتغير ل صح وبعدها يقدر يدخل على الصفحات اللي مسسموح له يدخلها لانها سجل دخول 

  return  isLoggedIn && userData?.role === 'admin' ? <Outlet /> : <Login pathName={pathLocationEveryUser.pathname} />
  //اذا سجل الدخول وتغيرت لصح يقدر يمر على الروابط اللي كانت محجوبه واذا كانت خطا يبقى في نفس الصفحة}
}


export default ProtectRouterAdmin