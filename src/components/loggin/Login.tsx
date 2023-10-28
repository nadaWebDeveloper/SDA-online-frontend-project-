import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUser, login } from '../../redux/slices/user/userSlice'
import { Link } from 'react-router-dom'
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Login = ({ pathName }: { pathName: string }) => {
  const { users } = useSelector((state: RootState) => state.usersReducer)
  const dispatch = useDispatch<AppDispatch>() //generics "is the better and more commonly used way to declare the type when working with Redux Toolkit and TypeScript in a React application."

  // const Dispatch: AppDispatch = useDispatch() ""
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nameInput = event.target.name
    const valueInput = event.target.value
    setUser((prevState) => {
      return { ...prevState, [nameInput]: valueInput }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      //make the login request -> api call
      //compare the login information
      //navigate ('/blogs)
      //step1: get the user data who wants to login
      //step2: match the data with ours users
      const foundUser = users.find((userData) => userData.email === user.email) //to checked if email exist on database or not & if email found then match the password
      //blockuser if is not found 
      if(!foundUser){
        console.log("user not match email in DB");
        return
       }

       if(foundUser.password !== user.password){
        console.log("password in not match");
        return
       }

       if(foundUser.ban){
        console.log("banned account , connect with company");
        return
       }

        //loggedin
        dispatch(login(foundUser))
        navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
        console.log(`Welcome`)
  
      //step3: if matched then update the isloginIn state as true
      //if not matched then stay at same page
      //Routing protection :
      //1.isLogged (user)
      //2.isAdmin
    } catch (error) {
      console.log(error)
    }

    setUser({
      email: '',
      password: ''
    })
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [buttonClicked, setButtonClicked] = useState(false);

const handleButtonClick = () => {
  setButtonClicked(true);
  // Any other logic you want to execute on button click
};

  return (
    <>
    <section>
    <form action="" onSubmit={handleSubmit}>

    <div className="inputField">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        </div>


        <div className="inputField">
        <input
          type= {isPasswordVisible ? 'text' : 'password'} 
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          required
        />
        <span onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
            </span>
        </div>
        {/* <p
              id="confirmnote"
              className={pwdFocus && !validPwd && buttonClicked ? 'instructions' : 'offscreen'>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p> */}

        
        <button onClick={handleButtonClick} >
          Login
        </button>
      </form>

         <div>
          <h4>Don't have an account ? <span>   
         <Link to="/register">Register</Link>
        </span></h4>
        </div>
    </section>
    </>
  )
}

export default Login
