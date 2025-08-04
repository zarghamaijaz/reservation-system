import { useState } from "react";
import Header from "../components/Header";
import Input from "../components/form-elements/Input";
import FullPageLoader from "../components/FullPageLoader";
import { addNewStudentAPI } from "../service/api";

const INTITIAL_FORMDATA = {
  name: "",
  password: "",
  phoneNumber: "",
  email: "",
  idCardNumber: ""
};

const AddNewStudent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      setIsLoading(true);
      const response = await addNewStudentAPI(formData);
      setIsLoading(false);
      if(response.success){
        alert(response.message);
      }
    }catch(err){
      console.error(err);
      setIsLoading(false)
    }
  }
  function handleChange(name, type){
      return function(e){
        const input = e.target.value;
        // Only allow digits
        if(type === "phoneNumber"){
            if (/^\d*$/.test(input)) {
                return setFormData(prev => ({...prev, [name]: input}));
            }
        }
        else{
            return setFormData(prev => ({...prev, [name]: input}));
        }
    }
  }

  return (
    <>
    {isLoading && <FullPageLoader />}
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/" />
      <div className="small-container">
        <div className="card">
          <h2 className="card-title">Add student</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-100">
                <p className="card-description mb-4">Please fill out important information.</p>
              </div>
              <div className="col-100">
                <Input
                  type="text"
                  placeholder="Student's name"
                  label="Name*"
                  info="A unique username will be generated based on this name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange("name")}
                />
              </div>
              <div className="col-100">
                <Input
                  type="text"
                  placeholder="Enter student's password"
                  label="Password*" 
                  id="password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  info="The student will use this password to login. Please ask your student to change this password after their first login."
                />
              </div>
              <div className="col-100">
                <Input
                  type="text"
                  placeholder="Student's phone number"
                  label="Phone Number*"
                  id="phoneNumber"
                  title="Only numbers are allowed"
                  value={formData.phoneNumber}
                  onChange={handleChange("phoneNumber", "phoneNumber")}
                />
              </div>
              <div className="col-100">
                <p className="card-description mb-4">Optional information.</p>
              </div>
              <div className="col-50">
                <Input
                  type="email"
                  placeholder="Student's email address"
                  label="Email" 
                  id="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                />
              </div>
              <div className="col-50">
                <Input
                  type="text"
                  placeholder="Student's ID card number"
                  label="ID card number" 
                  id="idCardNumber"
                  value={formData.idCardNumber}
                  onChange={handleChange("idCardNumber")}
                />
              </div>
              <div className="col-100">
                <div className="input-container">
                    <button disabled={formData.name === "" || formData.password === "" || formData.phoneNumber === ""} className="button button-primary">Create</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddNewStudent;
