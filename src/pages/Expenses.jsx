import React, { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import Checkbox from "../components/form-elements/Checkbox";
import DatePicker from "react-date-picker";
import Input from "../components/form-elements/Input";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  addMonthlyExpenseAPI,
  addDailyExpenseAPI,
  getExpenseAPI,
  deleteDailyExpenseAPI,
  deleteMonthlyExpenseAPI,
} from "../service/api";
import FullPageLoader from "../components/FullPageLoader";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import { getLocalDateFromUTCString, getLocalStringDateFromUTCString } from "../../utils/date.utils";

const INTITIAL_FORMDATA = {
  salary1: {
    amount: "",
    socialInsurance: "",
  },
  salary2: {
    amount: "",
    socialInsurance: "",
  },
  salary3: {
    amount: "",
    socialInsurance: "",
  },
  accountant: "",
  rent: "",
  date: new Date(),
};
const INITIAL_EXPENSE_ROW_DATA = {
  date: new Date(),
  description: "",
  amount: "",
  vat: "",
  invoicing: "manual",
};
const Expenses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState("");
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [totalData, setTotalData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [addNewDailyExpense, setAddNewDailyExpense] = useState(false);

  async function addMonthlyExpense() {
    try {
      console.log(formData);
      setIsLoading(true);
      const payload = {
        expense_type: "monthly",
        year: formData.date.getFullYear(),
        month: formData.date.getMonth(),
        salary_1: formData.salary1.amount,
        salary_1_social_insurance: formData.salary1.socialInsurance,
        salary_2: formData.salary2.amount,
        salary_2_social_insurance: formData.salary2.socialInsurance,
        salary_3: formData.salary3.amount,
        salary_3_social_insurance: formData.salary3.socialInsurance,
        accountant: formData.accountant,
        rent: formData.rent,
      };
      const response = addMonthlyExpenseAPI(payload);
      setIsLoading(false);
      Swal.fire(
        "Monthly expense added",
        "The monthly expense was added successfully",
        "success"
      );
      setOption("");
    } catch (err) {
      setIsLoading(false);
      Swal.fire("Error", "An error occured", "error");
    }
  }
  async function addDailyExpense() {
    try {
      setIsLoading(true);
      const payload = {
        expense_type: "daily",
        year: addNewDailyExpense.date.getFullYear(),
        month: addNewDailyExpense.date.getUTCMonth() + 1,
        date: addNewDailyExpense.date.toISOString(),
        description: addNewDailyExpense.description,
        amount: addNewDailyExpense.amount,
        vat_percentage: addNewDailyExpense.vat,
      };
      const response = await addDailyExpenseAPI(payload);
      setIsLoading(false);
      Swal.fire(
        "Daily expense added",
        "The daily expense was added successfully",
        "success"
      );
      setAddNewDailyExpense(false);
    } catch (err) {
      setIsLoading(false);
      Swal.fire("Error", "An error occured", "error");
    }
  }
  async function getExpense(){
    try{
      setIsLoading(true);
      const response = await getExpenseAPI({startDate: startDate.toISOString(), endDate: endDate.toISOString()})
      console.log(response);
      setIsLoading(false);
      if(response.daily_expenses){
        setDailyExpenses(response.daily_expenses)
      }
      if(response.monthly_expenses){
        setMonthlyExpenses(response.monthly_expenses)
      }
      setTotalData(response);
    }catch(err){
      setIsLoading(false);
      Swal.fire("Error", "An error occured", "error");
    }
  }

  function calculateVAT(item) {
    try {
      const vat = Number(item.vat);
      const amount = Number(item.amount);
      const vatValue = (amount / 100) * vat;
      if (isNaN(vatValue)) {
        return "0";
      } else return vatValue;
    } catch (err) {
      console.error(err);
      return "Invalid percentage specified";
    }
  }
  function deleteDailyExpense(id){
    return function(){
      Swal.fire({
        title: "Delete expense?",
        text: "Do you want to delete this expense?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "var(--clr-danger)",
        cancelButtonColor: "var(--clr-primary)",
        confirmButtonText: "Yes"
        }).then(async (result) => {
        if (result.isConfirmed) {
            try{
                setIsLoading(true);
                const response = await deleteDailyExpenseAPI(id);
                getExpense();
                setIsLoading(false);
    
            }catch (err) {
            setIsLoading(false);
            if(err.detail){
                Swal.fire("Error", err.detail, "error");
            }
            console.error(err);
            }
        }
        });
      };
    }
  function deleteMonthlyExpense(id){
    return function(){
      Swal.fire({
        title: "Delete expense?",
        text: "Do you want to delete this expense?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "var(--clr-danger)",
        cancelButtonColor: "var(--clr-primary)",
        confirmButtonText: "Yes"
        }).then(async (result) => {
        if (result.isConfirmed) {
            try{
                setIsLoading(true);
                const response = await deleteMonthlyExpenseAPI(id);
                getExpense();
                setIsLoading(false);
    
            }catch (err) {
            setIsLoading(false);
            if(err.detail){
                Swal.fire("Error", err.detail, "error");
            }
            console.error(err);
            }
        }
        });
    }

  }
  return (
    <>
      {isLoading && <FullPageLoader />}
      {addNewDailyExpense && (
        <div className="modal-container">
          <div className="small-container">
            <div className="card">
              <button
                onClick={(e) => setAddNewDailyExpense(false)}
                className="modal-close"
              >
                <IoMdClose />
              </button>
              <div className="row">
                <div className="col-100">
                  <div className="input-container">
                    <label htmlFor="" className="label">
                      Date
                    </label>
                    <DatePicker
                      format="dd/MM/yyyy"
                      value={addNewDailyExpense.date}
                      onChange={(value) =>
                        setAddNewDailyExpense((prev) => ({
                          ...prev,
                          date: value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="col-100">
                  <Input
                    label="Descrption"
                    placeholder="Description"
                    type="text"
                    value={addNewDailyExpense.description}
                    onChange={(e) =>
                      setAddNewDailyExpense((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-100">
                  <Input
                    label="Amount"
                    placeholder="Amount"
                    type="number"
                    value={addNewDailyExpense.amount}
                    onChange={(e) =>
                      setAddNewDailyExpense((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-100">
                  <Input
                    label="VAT %"
                    placeholder="VAT in %"
                    type="number"
                    value={addNewDailyExpense.vat}
                    onChange={(e) =>
                      setAddNewDailyExpense((prev) => ({
                        ...prev,
                        vat: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="button-group">
                <button
                  onClick={() => setAddNewDailyExpense(false)}
                  className="button button-primary-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={addDailyExpense}
                  className="button button-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/driving-instructor-home" />
        {option === "all" ? (
          <>
          <div className="row">
            <div className="col-50">
              <div className="input-container">
                  <label className="label">From</label>
                  <DatePicker format="dd/MM/yyyy" onChange={setStartDate} value={startDate} />
              </div>
              </div>
            <div className="col-50">
              <div className="input-container">
                  <label className="label">Till</label>
                  <DatePicker format="dd/MM/yyyy" onChange={setEndDate} value={endDate} />
              </div>
            </div>
          </div>
          <h2 className="section-title">Daily expenses</h2>
          <div className="table-container">
            <table className="table bordered">
              <thead>
                <tr>
                  <th>
                    <div className="table-cell">Date</div>
                  </th>
                  <th>
                    <div className="table-cell">Description</div>
                  </th>
                  <th>
                    <div className="table-cell">Amount (€)</div>
                  </th>
                  <th>
                    <div className="table-cell">VAT amount</div>
                  </th>
                  <th>
                    <div className="table-cell">VAT %</div>
                  </th>
                  <th className="table-action-head">
                    <div className="table-cell">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dailyExpenses.map(item => {
                  return(
                  <tr key={item.id}>
                    <td>
                      <div className="table-cell">{getLocalStringDateFromUTCString(item.date)}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.description}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.total_amount}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.vat_amount}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.vat_percentage}</div>
                    </td>
                    <td>
                      <div className="table-cell">
                        <div className="table-actions">
                          <button onClick={deleteDailyExpense(item.id)} className="table-action action-danger">
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          <h2 className="section-title">Monthly expenses</h2>
          <div className="table-container">
            <table className="table bordered">
              <thead>
                <tr>
                  <th>
                    <div className="table-cell">Year</div>
                  </th>
                  <th>
                    <div className="table-cell">Month</div>
                  </th>
                  <th>
                    <div className="table-cell">Salary 1</div>
                  </th>
                  <th>
                    <div className="table-cell">Social insurance</div>
                  </th>
                  <th>
                    <div className="table-cell">salary 2</div>
                  </th>
                  <th>
                    <div className="table-cell">Social insurance</div>
                  </th>
                  <th>
                    <div className="table-cell">Salary 3</div>
                  </th>
                  <th>
                    <div className="table-cell">Social insurance</div>
                  </th>
                  <th>
                    <div className="table-cell">Accountant</div>
                  </th>
                  <th>
                    <div className="table-cell">Rent</div>
                  </th>
                  <th className="table-action-head">
                    <div className="table-cell">Action</div>
                  </th>
                </tr>
              </thead>
              {monthlyExpenses.map(item => {
                  return(
                  <tr key={item.id}>
                    <td>
                      <div className="table-cell">{item.year}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.month}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.salary_1}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.salary_2_social_insurance}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.salary_2}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.salary_3_social_insurance}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.salary_3}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.salary_1_social_insurance}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.accountant}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.rent}</div>
                    </td>
                    <td>
                      <div className="table-cell">
                        <div className="table-actions">
                          <button onClick={deleteMonthlyExpense(item.id)} className="table-action action-danger">
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )})}
            </table>
          </div>
          <div className="small-container">
            <div className="card mt-8">
              <div className="detail-container">
                <div className="detail-name">Total daily:</div>
                <div className="detail-value">{totalData.total_daily}</div>
              </div>
              <div className="detail-container">
                <div className="detail-name">Total monthly:</div>
                <div className="detail-value">{totalData.total_monthly}</div>
              </div>
              <div className="detail-container">
                <div className="detail-name">Total VAT:</div>
                <div className="detail-value">{totalData.total_vat}</div>
              </div>
              <div className="detail-container">
                <div className="detail-name">Total amount:</div>
                <div className="detail-value">{totalData.total_amount}</div>
              </div>
            </div>
          </div>
          <div className="button-group">
            <button
              onClick={() => setOption("")}
              className="button button-primary-outline"
            >
              Back
            </button>
            <button
              onClick={getExpense}
              className="button button-primary"
            >
              Find
            </button>
          </div>
          </>
        ) : option === "standart" ? (
          <div className="small-container">
            <div className="card">
              <div className="row">
                <div className="col-100">
                  <DatePicker
                    format="dd/MM/yyyy"
                    onChange={(date) =>
                      setFormData((prev) => ({ ...prev, date: date }))
                    }
                    value={formData.date}
                    maxDetail="year" // stops at month selection
                    minDetail="decade" // optional: allow decade → year → month
                    clearIcon={null}
                  />
                </div>
                <div className="col-50">
                  <Input
                    label="Salary 1"
                    placeholder="Enter salary 1"
                    type="number"
                    value={formData.salary1.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary1: { ...prev.salary1, amount: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="col-50">
                  <Input
                    label="Social insurance"
                    placeholder="Enter social insurance"
                    type="number"
                    value={formData.salary1.socialInsurance}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary1: {
                          ...prev.salary1,
                          socialInsurance: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="col-50">
                  <Input
                    label="Salary 2"
                    placeholder="Enter salary 2"
                    type="number"
                    value={formData.salary2.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary2: { ...prev.salary2, amount: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="col-50">
                  <Input
                    label="Social insurance"
                    placeholder="Enter social insurance"
                    type="number"
                    value={formData.salary2.socialInsurance}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary2: {
                          ...prev.salary2,
                          socialInsurance: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="col-50">
                  <Input
                    label="Salary 1"
                    placeholder="Enter salary 1"
                    type="number"
                    value={formData.salary3.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary3: { ...prev.salary3, amount: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="col-50">
                  <Input
                    label="Social insurance"
                    placeholder="Enter social insurance"
                    type="number"
                    value={formData.salary3.socialInsurance}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary3: {
                          ...prev.salary3,
                          socialInsurance: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="col-50">
                  <Input
                    label="Accountant"
                    placeholder="Enter accountant amount"
                    type="number"
                    value={formData.accountant}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        accountant: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-50">
                  <Input
                    label="Rent"
                    placeholder="Enter rent amount"
                    type="number"
                    value={formData.rent}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, rent: e.target.value }))
                    }
                  />
                </div>
                <div className="col-100">
                  <div className="button-group">
                    <button
                      onClick={() => setOption("")}
                      className="button button-primary-outline"
                    >
                      Back
                    </button>
                    <button
                      onClick={addMonthlyExpense}
                      className="button button-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="small-container">
            <div className="row">
              <div className="col-33">
                <button
                  className="tile"
                  onClick={() =>
                    setAddNewDailyExpense(INITIAL_EXPENSE_ROW_DATA)
                  }
                >
                  <h4 className="tile-title">Add new</h4>
                </button>
              </div>
              <div className="col-33">
                <button className="tile" onClick={() => setOption("standart")}>
                  <h4 className="tile-title">Standart</h4>
                </button>
              </div>
              <div className="col-33">
                <button className="tile">
                  <h4 className="tile-title" onClick={() => setOption("all")}>
                    All
                  </h4>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Expenses;
