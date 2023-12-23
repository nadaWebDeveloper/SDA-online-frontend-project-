import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router'

import { AppDispatch} from '../../redux/store'
import { fetchUser, registerUser } from '../../redux/slices/user/userSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle , faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^[\w-\._\+%]+@(?!(live|hotmail|outlook|aol|yahoo|rocketmail|gmail|gmx\.com|mail\.com|inbox\.com|icloud|aim|yandex|zoho)$)(?:[\w-]+\.)+[\w]{2,30}$/;

const Register = () => {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [register, setRegister] = useState({
    firstName: '',
    lastName:'',
    email:'',
    password:'',
  })

  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [validLastName, setValidLastName] = useState(false)
  const [userLastFocus, setUserLastFocus] = useState(false)

  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  
  useEffect(() => {
    dispatch(fetchUser())
  }, [])


  useEffect(() => {
    setValidName(USER_REGEX.test(register.firstName))
  }, [register.firstName])

  useEffect(() => {
    setValidLastName(USER_REGEX.test(register.lastName))
  },[register.lastName])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(register.email))
  },[register.email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(register.password))
    setValidMatch(register.password === matchPwd)
  }, [register.password, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [register.firstName,register.lastName, register.email, register.password, matchPwd])


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

 const handleMatchPasswordChange = (event : ChangeEvent<HTMLInputElement>) =>
 {
  setMatchPwd(event.target.value);
 }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      setRegister((prevUser) => {
        return { ...prevUser, [event.target.name]: fileInput.files?.[0] }
      })
    } else {
      setRegister((prevUser) => {
        return { ...prevUser, [event.target.name]: event.target.value }
      })
    }
  }


  const handleSubmit = async (event: FormEvent) => {  
    event.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(register.firstName)
    const v2 = USER_REGEX.test(register.lastName)
    const v3 = EMAIL_REGEX.test(register.email)
    const v4 = PWD_REGEX.test(register.password)
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg('Invalid Entry')
      return
    }

      const newUser ={
        firstName: register.firstName,
        lastName: register.lastName,
        email:register.email,
        password:register.password
        };    

        dispatch(registerUser(newUser))
  
        setSuccess(true);
  }


  return (
    <div>
      {success ? (
        <section>
         <h1>Success!</h1>
          
        <h1>
        Hello {register.firstName} Check your email to Activate your Account
        <span className="line">
              <Link to="/">Home</Link>
            </span>

        </h1>        
        </section>
      ) : (
        <section>
          <p
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive">
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="FirstName">
              <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validName || !register.firstName ? 'hide' : 'invalid'} />
            </label>

            <div className="inputField">
            <input
              type="text"
              placeholder='First Name'
              id="FirstName"
              name='firstName'
              autoComplete="off"
              onChange={handleChange}
              value={register.firstName}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="FirstName"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            </div>

            <p
              id="FirstName"
              className={userFocus && !validName ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <label htmlFor="LastName">
              <FontAwesomeIcon icon={faCheck} className={validLastName ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validLastName || !register.lastName ? 'hide' : 'invalid'} />
            </label>

            <div className="inputField">
            <input
              type="text"
              placeholder='Last Name'
              id="LastName"
              name='lastName'
              value={register.lastName}
              onChange={handleChange}
              autoComplete="off"
              required
              aria-invalid={validLastName ? 'false' : 'true'}
              aria-describedby="LastName"
              onFocus={() => setUserLastFocus(true)}
              onBlur={() => setUserLastFocus(false)}
            />
            </div>

            <p
              id="LastName"
              className={userLastFocus &&  !validLastName ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <label htmlFor="email">
              <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validEmail || !register.email ? 'hide' : 'invalid'} />
            </label>
            
            <div className="inputField">
             <input
              type="email"
              placeholder='Email'
              id="email"
              name='email'
              value={register.email}
              onChange={handleChange}
              autoComplete="off"
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="email"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            /> 
            </div>

             <p
              id="email"
              className={emailFocus &&  !validEmail ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              example@domain.com
              <br />
              Letters, numbers, underscores, hyphens allowed.
              <br />
              Must example 3 to 30 characters 
          
            </p>
               
             {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <label htmlFor="password">
              <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !register.password ? 'hide' : 'invalid'} />
            </label>

            <div className="inputField">
            <input
              type= {isPasswordVisible ? 'text' : 'password'}             
              id="password"
              placeholder='Password'
              name='password'
              autoComplete="new-password"
              onChange={handleChange}
              value={register.password}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <span onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
            </span>
            </div>

            <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a special character.
              <br />
              Allowed special characters: <span aria-label="exclamation mark">!</span>{' '}
              <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
              <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>


            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <label htmlFor="MatchPassword">
              <FontAwesomeIcon
                icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'}  />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
            </label>
            
            <div className="inputField">
            <input
              type="password"
              placeholder='Confirm Password'
              id="MatchPassword"
              name='MatchPassword'
              onChange={handleMatchPasswordChange}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
             </div>

            <p
              id="confirmnote"
              className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */} 
            <button disabled={!validName || !validLastName || !validEmail || !validPwd || !validMatch ? true : false}>
              Sign Up
            </button >
          </form>
          <h4>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sing In</Link>
            </span>
          </h4>
        </section>
      )}
    </div>
  )
}

export default Register
