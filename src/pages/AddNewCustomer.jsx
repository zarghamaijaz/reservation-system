import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Input from "../components/form-elements/Input";
import FullPageLoader from "../components/FullPageLoader";
import { addNewCustomerAPI } from "../service/api";
import DatePicker from "react-date-picker";
import Checkbox from "../components/form-elements/Checkbox";
import Swal from "sweetalert2";

const INTITIAL_FORMDATA = {
  name: "",
  idDigit: "",
  idValue: "",
  category: "",
  carNoPlate: "",
  phoneNumber: "",
};

const AddNewCustomer = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [visaExpire, setVisaExpire] = useState("");
  const [learningExpire, setLearningExpire] = useState("");
  const [option, setOption] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const payload = {
        ...formData,
        dateOfBirth,
        visaExpire,
        learningExpire,
        option,
      }
      const response = await addNewCustomerAPI(payload);
      setIsLoading(false);
      if (response.error) {
        const {error} = response;
        return Swal.fire(error.type, error.message, "error");
      }
      else{
        Swal.fire("Customer added", "The customer was added successfully and you are rediredted to customer's list", "info");
        return navigate("/all-customers");
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      if(err.error){
        const {errors} = err.error.details;
        return Swal.fire({
          title: "Validation error",
          html: errors.map((error) => `<p>${error.message}</p>`).join(""),
          icon: "error"
        })
      }
      const {error} = err;
      return Swal.fire(error.type, error.message, "error");
    }
  }
  function handleChange(name, type) {
    return function (e) {
      const input = e.target.value;
      // Only allow digits
      if (type === "phoneNumber") {
        if (/^\d*$/.test(input)) {
          return setFormData((prev) => ({ ...prev, [name]: input }));
        }
      } else {
        return setFormData((prev) => ({ ...prev, [name]: input }));
      }
    };
  }
  function handleOptionChange(value) {
    return function(e){
      setOption(prev => {
        if(prev === value){
          return "";
        }
        else{
          return value;
        }
      });
    }
  }

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/driving-instructor-home" />
        <div className="small-container">
          <div className="card">
            <h2 className="card-title">Add customer</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Student's name"
                    label="Name*"
                    id="name"
                    value={formData.name}
                    onChange={handleChange("name")}
                  />
                </div>
                <div className="col-20">
                  <Input
                    limit={1}
                    type="text"
                    placeholder="1 digit"
                    label="ID digit"
                    id="name"
                    value={formData.idDigit}
                    onChange={handleChange("idDigit")}
                  />
                </div>
                <div className="col-80">
                  <Input
                    type="text"
                    placeholder="Will be the password of the customer"
                    label="ID value"
                    id="name"
                    value={formData.idValue}
                    onChange={handleChange("idValue")}
                  />
                </div>
                <div className="col-100">
                  <div className="input-container">
                    <label className="label">Date of birth</label>
                    <DatePicker onChange={setDateOfBirth} value={dateOfBirth} format="dd/MM/yyyy" />
                  </div>
                </div>
                <div className="col-100">
                  <div className="input-container">
                    <label className="label">Visa expire</label>
                    <DatePicker onChange={setVisaExpire} value={visaExpire} format="dd/MM/yyyy" />
                  </div>
                </div>
                <div className="col-100">
                  <div className="input-container">
                    <label className="label">Learning expire</label>
                    <DatePicker
                      format="dd/MM/yyyy"
                      onChange={setLearningExpire}
                      value={learningExpire}
                    />
                  </div>
                </div>
                <div className="col-20">
                  <Input
                    type="text"
                    placeholder=""
                    label="Category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange("category")}
                  />
                </div>
                <div className="col-80">
                  <Input
                    limit={6}
                    type="text"
                    placeholder="6 digits"
                    label="Car number plate"
                    id="name"
                    value={formData.carNoPlate}
                    onChange={handleChange("carNoPlate")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Phone number"
                    label="Phone number"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange("phoneNumber", "phoneNumber")}
                  />
                </div>
                <div className="col-33">
                  <Checkbox label="Need Test 1" onClick={handleOptionChange("needtest1")} checked={option === "needtest1"}/>
                </div>
                <div className="col-33">
                  <Checkbox label="Test 2" onClick={handleOptionChange("needtest2")} checked={option === "needtest2"}/>
                </div>
                <div className="col-33">
                  <Checkbox label="Test 3" onClick={handleOptionChange("needtest3")} checked={option === "needtest3"}/>
                </div>
                <div className="col-100">
                  <div className="input-container mt-8">
                    <button className="button button-primary">Save</button>
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

export default AddNewCustomer;
