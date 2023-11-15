import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import { RootState } from '../../redux/store'

import Login from '../loggin/Login'

const ProtectRouterUser = ({ children }:{ children:{} }) => {
  const pathLocationEveryUser = useLocation()
  const { isLoggedIn, isLoading, userData } = useSelector((state: RootState) => state.usersReducer)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return <Link to="/login" />
  }
  return children && isLoggedIn && userData?.role === 'user' ? (
    <Outlet />
  ) : (
    <Login pathName={pathLocationEveryUser.pathname} />
  )
}

export default ProtectRouterUser
