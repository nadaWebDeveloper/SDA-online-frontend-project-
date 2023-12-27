import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router"

import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"
import { forgetPassword } from "../../redux/slices/user/userSlice"

function ForgetPassword() {

     const [email, setEmail] = useState('')
     const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>() 

     const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setEmail(value)        
      }
      const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        dispatch(forgetPassword(email))
        navigate('/login')

      }

  return (
    <div className="sectionAdmin">
        Forget Password
        <form action="" onSubmit={handleSubmit}>
        <div className="inputField">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email} 
           onChange={handleInputChange}
            required
          />
        </div>

        <button>Reset email</button>
      </form>
        </div>
  )
}

export default ForgetPassword