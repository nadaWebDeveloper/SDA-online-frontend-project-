import { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^[\w-\._\+%]+@(?!(live|hotmail|outlook|aol|yahoo|rocketmail|gmail|gmx\.com|mail\.com|inbox\.com|icloud|aim|yandex|zoho)$)(?:[\w-]+\.)+[\w]{2,30}$/;

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [firstName, setFirstName] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [lastName, setLastName] = useState('')
  const [validLastName, setValidLastName] = useState(false)
  const [userLastFocus, setUserLastFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  

  useEffect(() => {
    // userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(firstName))
  }, [firstName])

  useEffect(() => {
    setValidLastName(USER_REGEX.test(lastName))
  },[lastName])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  },[email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [firstName,lastName, email, pwd, matchPwd])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(firstName)
    const v2 = USER_REGEX.test(lastName)
    const v3 = EMAIL_REGEX.test(email)
    const v4 = PWD_REGEX.test(pwd)
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg('Invalid Entry')
      return
    }

    setSuccess(true);
    // try {
    //     const response = await axios.post(REGISTER_URL,
    //         JSON.stringify({ user, pwd }),
    //         {
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true
    //         }
    //     );
    //     console.log(response?.data);
    //     console.log(response?.accessToken);
    //     console.log(JSON.stringify(response))
    //     setSuccess(true);
    //     //clear state and controlled inputs
    //     //need value attrib on inputs for this
    //     setUser('');
    //     setPwd('');
    //     setMatchPwd('');
    // } catch (err) {
    //     if (!err?.response) {
    //         setErrMsg('No Server Response');
    //     } else if (err.response?.status === 409) {
    //         setErrMsg('Username Taken');
    //     } else {
    //         setErrMsg('Registration Failed')
    //     }
    //     errRef.current.focus();
    // }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>Welcome <h4>{firstName}</h4> To world</p>
          <h4>
            <Link to="/login">Sing In</Link>
          </h4>
        </section>
      ) : (
        <>
        <h1>Register</h1>
        <section>
          <p
            // ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive">
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="FirstName">
              FirstName:
              <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validName || !firstName ? 'hide' : 'invalid'} />
            </label>
            <input
              type="text"
              id="FirstName"
              // ref={userRef}
              autoComplete="off"
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="FirstName"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="FirstName"
              className={userFocus && firstName && !validName ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="LastName">
              Last Name:
              <FontAwesomeIcon icon={faCheck} className={validLastName ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? 'hide' : 'invalid'} />
            </label>

            <input
              type="text"
              id="LastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              autoComplete="off"
              required
              aria-invalid={validLastName ? 'false' : 'true'}
              aria-describedby="LastName"
              onFocus={() => setUserLastFocus(true)}
              onBlur={() => setUserLastFocus(false)}
            />

            <p
              id="LastName"
              className={userLastFocus && lastName && !validLastName ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>


            <label htmlFor="email">
              Email:
              <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? 'hide' : 'invalid'} />
            </label>
            
             <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="off"
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="email"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              // value={user.email}
              // onChange={handleChange}
            /> 

             <p
              id="email"
              className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              example@domain.com
              <br />
              Letters, numbers, underscores, hyphens allowed.
              <br />
              Must example 3 to 30 characters 
          
            </p>


            <label htmlFor="password">
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(event) => setPwd(event.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
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

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'}  />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
            </label>
            
            <input
              type="password"
              id="confirm_pwd"
              onChange={(event) => setMatchPwd(event.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
               
            <button disabled={!validName || !validLastName || !validEmail || !validPwd || !validMatch ? true : false}>
              Sign Up
            </button>
          </form>
          <h4>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sing In</Link>
            </span>
          </h4>
        </section>
      </>
      )}
    </>
  )
}

export default Register
