import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Input from "../components/form-elements/Input";
import FullPageLoader from "../components/FullPageLoader";
import { createCustomerInvoiceAPI } from "../service/api";
import DatePicker from "react-date-picker";
import Checkbox from "../components/form-elements/Checkbox";
import Swal from "sweetalert2";
import {format} from 'date-fns';

const INTITIAL_FORMDATA = {
  amount: "",
  description: "",
  notes: "",
  student_name: "",
  vat_rate: "",
};

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);
  const [date, setDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const payload = {
        ...formData,
        date: format(date, 'yyyy-MM-dd'),
      };
      const response = await createCustomerInvoiceAPI(payload);
      setIsLoading(false);
      if (response.detail) {
        return Swal.fire("Error", response.detail, "error");
      }
      return navigate("/all-invoices");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      const { error } = err;
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

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/driving-instructor-home" />
        <div className="small-container">
          <div className="card">
            <h2 className="card-title">Add invoice</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Student's name"
                    label="Student name*"
                    id="student_name"
                    value={formData.student_name}
                    onChange={handleChange("student_name")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Amount"
                    label="Amount"
                    id="amount"
                    value={formData.amount}
                    onChange={handleChange("amount")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="VAT"
                    label="VAT"
                    id="vat_rate"
                    value={formData.vat_rate}
                    onChange={handleChange("vat_rate")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Description"
                    label="Description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange("description")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Notes"
                    label="Notes"
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange("notes")}
                  />
                </div>
                <div className="col-100">
                  <div className="input-container">
                    <label className="label">Invoice date</label>
                    <DatePicker
                      onChange={setDate}
                      value={date}
                      format="dd/MM/yyyy"
                    />
                  </div>
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

export default CreateInvoice;
