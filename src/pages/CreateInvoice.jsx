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
  amount_1: "",
  amount_2: "",
  amount_3: "",
  quantity_1: "",
  quantity_2: "",
  quantity_3: "",
  description_1: "",
  description_2: "",
  description_3: "",
  notes: "",
  student_name: "",
  vat_rate: "",
  vat_rate_2: "",
  vat_rate_3: "",
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
      // console.log(payload)
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
                    placeholder="Amount 1"
                    label="Amount 1"
                    id="amount_1"
                    value={formData.amount_1}
                    onChange={handleChange("amount_1")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Amount 2"
                    label="Amount 2"
                    id="amount_2"
                    value={formData.amount_2}
                    onChange={handleChange("amount_2")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Amount 3"
                    label="Amount 3"
                    id="amount_3"
                    value={formData.amount_3}
                    onChange={handleChange("amount_3")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Quantity 1"
                    label="Quantity 1"
                    id="quantity_1"
                    value={formData.quantity_1}
                    onChange={handleChange("quantity_1")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Quantity 2"
                    label="Quantity 2"
                    id="quantity_2"
                    value={formData.quantity_2}
                    onChange={handleChange("quantity_2")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Quantity 3"
                    label="Quantity 3"
                    id="quantity_3"
                    value={formData.quantity_3}
                    onChange={handleChange("quantity_3")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="VAT 1"
                    label="VAT 1"
                    id="vat_rate"
                    value={formData.vat_rate}
                    onChange={handleChange("vat_rate")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="VAT 2"
                    label="VAT 2"
                    id="vat_rate_2"
                    value={formData.vat_rate_2}
                    onChange={handleChange("vat_rate_2")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="VAT 3"
                    label="VAT 3"
                    id="vat_rate_3"
                    value={formData.vat_rate_3}
                    onChange={handleChange("vat_rate_3")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Description 1"
                    label="Description 1"
                    id="description_1"
                    value={formData.description_1}
                    onChange={handleChange("description_1")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Description 2"
                    label="Description 2"
                    id="description"
                    value={formData.description_2}
                    onChange={handleChange("description_2")}
                  />
                </div>
                <div className="col-100">
                  <Input
                    type="text"
                    placeholder="Description 3"
                    label="Description 3"
                    id="description_3"
                    value={formData.description_3}
                    onChange={handleChange("description_3")}
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
