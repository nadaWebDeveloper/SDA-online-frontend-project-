import { useLocation, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { clearError, updateUser } from '../../redux/slices/user/userSlice'
import useUserState from '../Hooks/useUserState'

const EditProfile = () => {
  const {error} = useUserState()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { state } = useLocation()


  const [profile, setProfile] = useState({
    firstName: state.firstName,
    lastName:state.lastName,
    email:state.email,
  })

  useEffect(() => {
    if(error){
   alert(error)
   setTimeout(()=>{
     dispatch(clearError())    
         }, 1000)
    }
}, [error])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: nameInput, value: valueInput } = event.target;
    setProfile((prevUser) => {
      return { ...prevUser, [nameInput]: valueInput }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (confirm('Are you sure to edit profile')) {
      const updateUserinfo = {
        _id: state._id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      }
      dispatch(updateUser(updateUserinfo))
      navigate('/dashboard/user')
    } else {
      return false
    }
  }

  const handleClick = () => {
    navigate('/dashboard/user')
  }

  return (
    <div className="upc">
      <FontAwesomeIcon icon={faTimes} onClick={handleClick} className="closeProfile" />
      <div className="grad">
        <h2>Edit Profile</h2>
      </div>
      <div className="downProfile">
        <section>
          <form onSubmit={handleSubmit}>
            <div className="inputField">
              <input
                type="text"
                name="firstName"
                placeholder="first Name"
                value={profile.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <input
                type="text"
                name="lastName"
                placeholder="last Name"
                value={profile.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default EditProfile
