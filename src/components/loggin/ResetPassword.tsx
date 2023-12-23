import { useNavigate, useParams } from "react-router"
import jwtDecode  from "jwt-decode";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle , faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/slices/user/userSlice";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/


function ResetPassword() {

    const {token} = useParams()
    const navigate = useNavigate()
    const decoded = jwtDecode(String(token));
    const dispatch = useDispatch<AppDispatch>()
    const name = decoded.firstName

    const [password, setPassword] = useState('')

    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')


    useEffect(() => {
      setValidPwd(PWD_REGEX.test(password))
      setValidMatch(password === matchPwd)
    }, [password, matchPwd])
  
    useEffect(() => {
      setErrMsg('')
    }, [password, matchPwd])
  

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

 const handleMatchPasswordChange = (event : ChangeEvent<HTMLInputElement>) =>
 {
  setMatchPwd(event.target.value);
 }

 const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  setPassword(event.target.value)
  
}

const handleSubmit = async (event: FormEvent) => {  
  event.preventDefault()
  // if button enabled with JS hack
  const v1 = PWD_REGEX.test(password)
  if (!v1) {
    setErrMsg('Invalid Entry')
    return
  }
  dispatch(resetPassword({password, token}))

  navigate('/login')

}


  return (
         <div className="sectionAdmin">
          Reset Password
        <h2>Welcome {name}! Fill the form to Reset Password</h2>
        
        <form onSubmit={handleSubmit}>
        <label htmlFor="password">
              <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? 'hide' : 'invalid'} />
            </label>

            <div className="inputField">
            <input
              type= {isPasswordVisible ? 'text' : 'password'}             
              id="password"
              placeholder='Password'
              name='password'
              autoComplete="new-password"
              onChange={handleChange}
              value={password}
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
              type= {isPasswordVisible ? 'text' : 'password'}             
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
            <span onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
            </span>
             </div>

            <p
              id="confirmnote"
              className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <button disabled={!validPwd || !validMatch ? true : false} >Reset Password</button>
        </form>
    </div>
  )
}

export default ResetPassword
