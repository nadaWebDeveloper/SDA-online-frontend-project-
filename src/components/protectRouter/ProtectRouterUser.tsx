import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router'

import { RootState } from '../../redux/store'

import Login from '../loggin/Login'

const ProtectRouterUser = ({ children }:{ children:{} }) => {
  const pathLocationEveryUser = useLocation()
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  return children && isLoggedIn && userData?.isAdmin === false ? (
    <Outlet />
  ) : (
    <Login pathName={pathLocationEveryUser.pathname} />
  )
}

export default ProtectRouterUser
