import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router";
import { getJwtData } from "../../utils/jwtData.utils";

import { changePasswordAPI } from "../service/api";
import Input from "../components/form-elements/Input";
import FullPageLoader from "../components/FullPageLoader";

const INTITIAL_FORMDATA = {
  password: "",
  repeatPassword: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await changePasswordAPI(formData);
      setIsLoading(false);
      if (response.success) {
          navigate('/');
          return alert(response.message);
      } else {
        return alert("Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  function handleChange(name) {
    return function (e) {
      return setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    };
  }
  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/" />
        <div className="small-container">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <h2 className="card-title">Change password</h2>
              <p className="card-description">
                Change your password to make sure only you can access your
                account.
              </p>
              <Input
                type="password"
                placeholder="Enter your new password"
                label="New password"
                id="password"
                value={formData.password}
                onChange={handleChange("password")}
              />
              <Input
                type="password"
                placeholder="Enter your new password again"
                label="Repeat password"
                id="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange("repeatPassword")}
              />
              <div className="input-container">
                <button
                  disabled={
                    formData.password === "" ||
                    formData.repeatPassword === "" ||
                    formData.password !== formData.repeatPassword
                  }
                  className="button button-primary"
                >
                  Save
                </button>
              </div>
              {/* <div className='text-center'>
              <Link to='/signup' className='link link-primary'>Visiting for the first time? Signup here.</Link>
            </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
