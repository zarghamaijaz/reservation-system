import { useEffect} from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("auth");
        navigate("/");
    }, []);
  return (
    <div>Logging you out please wait...</div>
  )
}

export default Logout