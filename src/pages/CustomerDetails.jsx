import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Input from "../components/form-elements/Input";
import FullPageLoader from "../components/FullPageLoader";
import {
  getCustomerDetailsAPI,
  updateCustomerDetailsAPI,
} from "../service/api";
import DatePicker from "react-date-picker";
import Checkbox from "../components/form-elements/Checkbox";
import { getLocalDateFromUTCString } from "../../utils/date.utils";
import Swal from "sweetalert2";

const INTITIAL_FORMDATA = {
  name: "",
  idDigit: "",
  idValue: "",
  category: "",
  carNoPlate: "",
  phoneNumber: "",
  dateOfBirth: "",
  visaExpire: "",
  learningExpire: "",
  testStatus: "",
};

const CustomerDetails = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [visaExpire, setVisaExpire] = useState("");
  const [learningExpire, setLearningExpire] = useState("");
  const [option, setOption] = useState("");

  async function fetchCustomerDetails() {
    try {
      setIsLoading(true);
      const response = await getCustomerDetailsAPI();
      setIsLoading(false);
      if (response.success) {
        setFormData(response.data);
        const newDateOfBirth = getLocalDateFromUTCString(
          response.data.dateOfBirth
        );
        setDateOfBirth(newDateOfBirth);
        const newVisaExpire = getLocalDateFromUTCString(
          response.data.visaExpire
        );
        setVisaExpire(newVisaExpire);
        const newLearningExpire = getLocalDateFromUTCString(
          response.data.learningExpire
        );
        setLearningExpire(newLearningExpire);
      }
      if (response.data.testStatus) {
        setOption(response.data.testStatus);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      // We can store the API response from the getCustomerDetails in a different state or a variable.
      // We can compare the values with that and add only the values in the payload object that were modified.
      // This way our request will work as a PATCH instead of PUT

      const payload = {
        // Add only modified values or add all
      };
      const response = await updateCustomerDetailsAPI(payload);
      if (response.success) {
        navigate("/all-customers");
        Swal.fire({
          title: "Changes saved",
          text: response.message,
          icon: "success",
        });
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
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

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/all-customers" />
        <div className="small-container">
          <div className="card">
            <h2 className="card-title">View/edit customer</h2>
            {isLoading ? (
              <div>Please wait</div>
            ) : (
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
                      <DatePicker
                        onChange={setDateOfBirth}
                        value={dateOfBirth}
                      />
                    </div>
                  </div>
                  <div className="col-100">
                    <div className="input-container">
                      <label className="label">Visa expire</label>
                      <DatePicker onChange={setVisaExpire} value={visaExpire} />
                    </div>
                  </div>
                  <div className="col-100">
                    <div className="input-container">
                      <label className="label">Learning expire</label>
                      <DatePicker
                        onChange={setLearningExpire}
                        value={learningExpire}
                      />
                    </div>
                  </div>
                  <div className="col-20">
                    <Input
                      limit={2}
                      type="text"
                      placeholder="2 digit"
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
                    <Checkbox
                      label="Need Test 1"
                      onClick={(e) => setOption("needtest1")}
                      checked={option === "needtest1"}
                    />
                  </div>
                  <div className="col-33">
                    <Checkbox
                      label="Test 2"
                      onClick={(e) => setOption("needtest2")}
                      checked={option === "needtest2"}
                    />
                  </div>
                  <div className="col-33">
                    <Checkbox
                      label="Test 3"
                      onClick={(e) => setOption("needtest3")}
                      checked={option === "needtest3"}
                    />
                  </div>
                  <div className="col-100">
                    <div className="button-group">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/all-customers");
                        }}
                        className="button button-primary-outline"
                      >
                        Cancel
                      </button>
                      <button className="button button-primary">Save</button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/customer-lessons");
                        }}
                        className="button button-primary"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
