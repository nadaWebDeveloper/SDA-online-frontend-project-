import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { useNavigate } from "react-router"
import { fetchUser, registerUser } from "../../redux/slices/user/userSlice"

const  Register =()=> {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    ban: false
  })
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()


  const handleChange = (event: ChangeEvent<HTMLInputElement>)=> {

    const inputValue = event.target.value
    setUser((prevUser) => {
      return {...prevUser, [inputValue]:inputValue}
    })
  }


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newUser = {id: new Date().getMilliseconds(), ...user }

     //fetch all data then add new user on database
    dispatch(fetchUser()).then(() => registerUser(newUser))
    console.log("welcome to new user in website");
    navigate('/login')
  }

  return (
<>
<div>
  <h1>Register</h1>
  <form onSubmit={handleSubmit}>

    <input type="text" 
    name="FirstName" placeholder="First Name"
    value={user.firstName} onChange={handleChange} />

   <input type="text" 
    name="LastName" placeholder=" Last Name"
    value={user.firstName} onChange={handleChange} />

   <input type="email"  
    name="email" placeholder="example@domain.com"
    value={user.email} onChange={handleChange} />

   <input type="password" 
    name="password" placeholder=" At least 12 character"
    value={user.password} onChange={handleChange} />

    <button>Register</button>
  </form>
</div>

</>  
)
}

export default Register