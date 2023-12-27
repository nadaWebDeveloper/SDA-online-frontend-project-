import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import { RootState } from '../../redux/store'

import Login from '../loggin/Login'

const ProtectRouterAdmin = ({ children }:{ children:{} }) => {
  const pathLocationEveryUser = useLocation()

  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)

  return children && isLoggedIn && userData?.isAdmin === true ? (
    <Outlet />
  ) : (
    <Login pathName={pathLocationEveryUser.pathname} />
  )
}

export default ProtectRouterAdmin
