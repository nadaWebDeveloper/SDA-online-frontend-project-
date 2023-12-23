import { ChangeEvent, FormEvent, useState } from "react"
import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"
import { forgetPassword } from "../../redux/slices/user/userSlice"

function ForgetPassword() {

     const [email, setEmail] = useState('')
     const dispatch = useDispatch<AppDispatch>() 

     const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setEmail(value)        
      }
      const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
      console.log('email',email);
        dispatch(forgetPassword(email))
      }

  return (
    <div className="sectionAdmin">
        ForgetPassword
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