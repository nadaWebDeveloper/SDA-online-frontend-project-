import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchUser, logInUser } from '../../redux/slices/user/userSlice'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useUserState from '../Hooks/useUserState'

const Login = ({ pathName }: { pathName: string }) => {
  const { users } = useUserState()
  const dispatch = useDispatch<AppDispatch>() //generics "is the better and more commonly used way to declare the type when working with Redux Toolkit and TypeScript in a React application."
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: nameInput, value: valueInput } = event.target
    setUser((prevState) => {
      return { ...prevState, [nameInput]: valueInput }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
try{
  const loggInUser ={
    email: user.email,
    password: user.password,
    };    
      const response = await logInUser(loggInUser)
      alert(response.message);
      // const role = foundUser.isAdmin 
      // role ? 'admin' : 'user'
      //  navigate(pathName ? pathName : `/dashboard/${role}`)
}catch (error) {
 alert(error.response.data.msg)
  if(user.email || user.password === ''){
    const errors = `
    ${error.response.data.errors[0]}
    ${error.response.data.errors[1]}
    ${error.response.data.errors[2]}
    ${error.response.data.errors[3]}
   `
  alert(errors);
 }
}
   setUser({
      email: '',
      password: ''
    })
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const [buttonClicked, setButtonClicked] = useState(false)

  const handleButtonClick = () => {
    setButtonClicked(true)
    // Any other logic you want to execute on button click
  }

  return (
    <section>
      <h1>Sign In</h1>

      <form action="" onSubmit={handleSubmit}>
        <div className="inputField">
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="inputField">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={handleInputChange}
            required
          />
          <span onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
          </span>
        </div>
        <button onClick={handleButtonClick}>Sign In</button>
      </form>

      <div>
        <h4>
          Don't have an account ?{' '}
          <span>
            <Link to="/register">Register</Link>
          </span>
        </h4>
        <h4>
          Forget password{' '}
          <span>
            <Link to="">Register</Link>
          </span>
        </h4>
      </div>
    </section>
  )
}

export default Login
