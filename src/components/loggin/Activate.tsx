import { useNavigate, useParams } from "react-router"
import jwtDecode  from "jwt-decode";
import axios from 'axios';

import { activateUser } from "../../redux/slices/user/userSlice";


function Activate() {

  interface DecodedToken {
    firstName: string;
  }
    const {token} = useParams()
    const navigate = useNavigate()
    const decoded = jwtDecode(String(token)) as DecodedToken ;

    const handleActivate = async() => {
try {
  const response = await activateUser(String(token))
  alert(response.message);
    navigate('/login')
} catch (error) {
  if(axios.isAxiosError(error) && error.response?.data?.msg){
    alert(error.response?.data?.msg)
  }
}
    }
  return (
    <div className="sectionAdmin">
        <h2>Welcome <span className="colorName">{decoded.firstName}</span>!  click the button to Activate your account</h2>
        <button onClick={handleActivate}>Activate</button>
    </div>
  )
}

export default Activate