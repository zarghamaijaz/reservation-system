import { useState } from "react";
import Header from "../components/Header";

const INTITIAL_FORMDATA = {
  name: "",
  username: "",
  phoneNumber: "",
  email: "",
  idCardNumber: ""
};

const AddNewStudent = () => {
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("===== CALL API HERE =====");
  }
  function handleChange(name, type){
      return function(e){
        const input = e.target.value;
        // Only allow digits
        if(type === 'phoneNumber'){
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
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/" />
      <div className="small-container">
        <div className="card">
          <h2 className="card-title">Create student</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-100">
                <p className="card-description mb-4">Please fill out important information.</p>
              </div>
              <div className="col-50">
                <div className="input-container">
                  <label htmlFor="name" className="label">Name*</label>
                  <input
                    id="name"
                    className="input"
                    type="text"
                    value={formData.name}
                    onChange={handleChange("name")}
                    placeholder="Enter student's name"
                  />
                </div>
              </div>
              <div className="col-50">
                <div className="input-container">
                  <label htmlFor="username" className="label">Username*</label>
                  <input
                    id="username"
                    className="input"
                    type="text"
                    value={formData.username}
                    onChange={handleChange("username")}
                    placeholder="Enter student's username"
                  />
                </div>
              </div>
              <div className="col-100">
                <div className="input-container">
                  <label htmlFor="phoneNumber" className="label">Phone Number*</label>
                  <input
                    id="phoneNumber"
                    className="input"
                    type="text"
                    pattern="^[0-9]+$"
                    title="Only numbers are allowed"
                    value={formData.phoneNumber}
                    onChange={handleChange("phoneNumber", "phoneNumber")}
                    placeholder="Enter student's phone number"
                  />
                </div>
              </div>
              <div className="col-100">
                <p className="card-description mb-4">Optional information.</p>
              </div>
              <div className="col-50">
                <div className="input-container">
                  <label htmlFor="email" className="label">Email</label>
                  <input
                    id="email"
                    className="input"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    placeholder="Enter student's email address"
                  />
                </div>
              </div>
              <div className="col-50">
                <div className="input-container">
                  <label htmlFor="idCardNumber" className="label">ID card number</label>
                  <input
                    id="idCardNumber"
                    className="input"
                    type="text"
                    value={formData.idCardNumber}
                    onChange={handleChange("idCardNumber")}
                    placeholder="Enter student's ID card number"
                  />
                </div>
              </div>
              <div className="col-100">
                <div className='input-container'>
                    <button disabled={formData.name === '' || formData.username === '' || formData.phoneNumber === ''} className='button button-primary'>Create</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewStudent;
