import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Header from "../components/Header";
import Input from "../components/form-elements/Input";
import FullPageLoader from "../components/FullPageLoader";
import {
  getCustomerDetailsAPI,
  updateCustomerDetailsAPI,
} from "../service/api";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import Checkbox from "../components/form-elements/Checkbox";
import { combineDateTimeToUTC, getLocalDateFromUTCString } from "../../utils/date.utils";
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
  option: "",
};

const CustomerDetails = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customer-id");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [visaExpire, setVisaExpire] = useState("");
  const [learningExpire, setLearningExpire] = useState("");
  const [testDate, setTestDate] = useState("");
  const [testStartTime, setTestStartTime] = useState("");
  const [testEndTime, setTestEndTime] = useState("");
  const [option, setOption] = useState("");
  if(!customerId){
    navigate("/all-customers");
  }

  async function fetchCustomerDetails() {
    try {
      setIsLoading(true);
      const response = await getCustomerDetailsAPI(customerId);
      setIsLoading(false);
      if (response) {
        setFormData(response);
        const newDateOfBirth = getLocalDateFromUTCString(
          response.dateOfBirth
        );
        setDateOfBirth(newDateOfBirth);
        const newVisaExpire = getLocalDateFromUTCString(
          response.visaExpire
        );
        setVisaExpire(newVisaExpire);
        const newLearningExpire = getLocalDateFromUTCString(
          response.learningExpire
        );
        setLearningExpire(newLearningExpire);

        if(response.testDate){
          const newTestDate = getLocalDateFromUTCString(
            response.testDate
          );
          setTestDate(newTestDate);

        }
      }
      if (response.option) {
        setOption(response.option);
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
      // We can store the API response from the getCustomerDetails in a different state or a variable.
      // We can compare the values with that and add only the values in the payload object that were modified.
      // This way our request will work as a PATCH instead of PUT
      
      const payload = {
        name: formData.name,
        idDigit: formData.idDigit,
        idValue: formData.idValue,
        category: formData.category,
        carNoPlate: formData.carNoPlate,
        dateOfBirth,
        visaExpire,
        learningExpire,
        testDate,
        testStartTime,
        testEndTime,
        option,
      };
      // if(payload.testDate === "" || payload.testDate === null || payload.testDate === undefined){
        //   payload.testDate = undefined
        // }
      if(payload.testDate){
        if(!payload.testStartTime){
          return Swal.fire("validation error", "Please specify a test start time", "error");
        }
        if(!payload.testEndTime){
          return Swal.fire("validation error", "Please specify a test end time", "error");
        }
      }

      payload.testStartTime = combineDateTimeToUTC(testDate, testStartTime).toISOString();
      payload.testEndTime = combineDateTimeToUTC(testDate, testEndTime).toISOString();

      console.log(payload)
      console.log(testStartTime)
      console.log(testEndTime)
      setIsLoading(true);
      const response = await updateCustomerDetailsAPI(customerId, payload);
      if (response.error) {
        const {error} = response;
        return Swal.fire(error.message, error.type, "error");
      }
      else{
        navigate("/all-customers");
        Swal.fire({
          title: "Changes saved",
          text: "You have been redirected to all customers page.",
          icon: "success",
        });
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      const {error} = err;
      return Swal.fire(error.message, error.type, "error");
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
                        format="dd/MM/yyyy"
                        onChange={setDateOfBirth}
                        value={dateOfBirth}
                      />
                    </div>
                  </div>
                  <div className="col-100">
                    <div className="input-container">
                      <label className="label">Visa expire</label>
                      <DatePicker format="dd/MM/yyyy" onChange={setVisaExpire} value={visaExpire} />
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
                  <div className="col-100">
                    <div className="input-container">
                      <label className="label">Test date</label>
                      <DatePicker
                        format="dd/MM/yyyy"
                        onChange={setTestDate}
                        value={testDate}
                      />
                    </div>
                  </div>
                  <div className="col-50">
                    <div className="input-container">
                      <label className="label">Test start time</label>
                      <TimePicker
                        format="HH:mm"
                        onChange={setTestStartTime}
                        value={testStartTime}
                      />
                    </div>
                  </div>
                  <div className="col-50">
                    <div className="input-container">
                      <label className="label">Test end time</label>
                      <TimePicker
                        format="HH:mm"
                        onChange={setTestEndTime}
                        value={testEndTime}
                      />
                    </div>
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
                          navigate(`/customer-lessons?customer-id=${customerId}`);
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
