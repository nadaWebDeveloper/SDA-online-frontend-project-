import { useNavigate, useParams } from "react-router"
import jwtDecode  from "jwt-decode";

import { activateUser } from "../../redux/slices/user/userSlice";


function Activate() {
    const {token} = useParams()
    const navigate = useNavigate()
    const decoded = jwtDecode(String(token),{ header: true });
    console.log('decoded',decoded);
    console.log('token',token);

    const handleActivate = async() => {
try {
  const response = await activateUser(String(token))
  alert(response.message);
    navigate('/login')
} catch (error) {
  console.log(error.response.data.message);
}

    }
  return (
    <div className="sectionAdmin">
      {/* {decoded.name} */}
        <h2>Welcome {decoded.firstName}! click the button to Activate your account</h2>
        <button onClick={handleActivate}>Activate</button>
    </div>
  )
}

export default Activate