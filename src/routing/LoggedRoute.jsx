import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { getJwtData } from "../../utils/jwtData.utils";
import allowedRoutes from "../routing/allowedRoutes.json";

const LoggedRoute = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState(false);
  const jwtData = getJwtData();

  useEffect(() => {
    if (jwtData) {
      const allowedRoutesToCurrentUser = allowedRoutes[jwtData.role];
      if(location.pathname === '/'){
        navigate(allowedRoutesToCurrentUser.default);
        setIsAllowed(true);
      }
      else if(allowedRoutesToCurrentUser.routes.indexOf(location.pathname) !== -1){
        setIsAllowed(true);
      }
      else{
        navigate('/not-allowed');
      }
    } else {
      navigate("/home");
    }
  }, [location.pathname]);
  
  return isAllowed ? <Outlet /> : <div>Please wait...</div>;
};

export default LoggedRoute;
