import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { getJwtData } from "../../utils/jwtData.utils";

const GuestRoute = () => {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);
  const jwtData = getJwtData();
  useEffect(() => {
    if (jwtData) {
      navigate("/");
    } else {
      setIsAllowed(true);
    }
  }, []);
  return isAllowed ? <Outlet /> : <div>Please wait...</div>;
};

export default GuestRoute;