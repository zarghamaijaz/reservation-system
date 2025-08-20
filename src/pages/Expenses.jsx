import React, { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import Checkbox from "../components/form-elements/Checkbox";
import DatePicker from "react-date-picker";
import Input from "../components/form-elements/Input";
import { RiDeleteBin6Line } from "react-icons/ri";


const INITIAL_STANDART_DATA = {
    salary1: false,
    salary2: false,
    salary3: false,
    socialInsurance1: false,
    socialInsurance2: false,
    socialInsurance3: false,
    accountant:false,
    rent:false,
}
const INITIAL_EXPENSE_ROW_DATA = {
    date: new Date(),
    description:"",
    amount:"",
    vat:"",
    invoicing: "manual",
}
const Expenses = () => {
    const [option, setOption] = useState("");
    const [standartData, setStandartData] = useState(INITIAL_STANDART_DATA);
    const [tableRows, setTableRows] = useState([INITIAL_EXPENSE_ROW_DATA]);
    function calculateVAT(item){
        try{
            const vat = Number(item.vat)
            const amount = Number(item.amount)
            const vatValue = (amount / 100) * vat;
            if(isNaN(vatValue)){
                return "0"
            }
            else return vatValue;
        }catch(err){
            console.error(err);
            return "Invalid percentage specified"
        }
    }
  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/" />
      {option === "addNew" ? (
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
                            <div className="table-cell">Amount (Euro)</div>
                        </th>
                        <th>
                            <div className="table-cell">VAT</div>
                        </th>
                        <th>
                            <div className="table-cell">%</div>
                        </th>
                        <th>
                            <div className="table-cell">Invoices</div>
                        </th>
                        <th className="table-action-head">
                            <div className="table-cell">Action</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className="table-cell">
                                    <DatePicker onChange={value => {
                                        const newData = tableRows.map((row, i)=>{
                                            if(i === index){
                                                return {...row, date: value}
                                            }
                                            else return row;
                                        })
                                        setTableRows(newData);
                                    }} value={item.date} />
                                </div>
                            </td>
                            <td>
                                <div className="table-cell">
                                    <select value={item.description} onChange={e => {
                                        const value = e.target.value;
                                        const newData = tableRows.map((row, i) => {
                                            if(i === index){
                                                return {...row, description: value}
                                            }
                                            else return row;
                                        });
                                        setTableRows(newData);
                                    }} className="select">
                                        <option value="">Choose an option</option>
                                        <option value="Fuels">Fuels</option>
                                        <option value="Part">Part</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div className="table-cell">
                                    <Input containerClass="m-0" type="number" value={item.amount} onChange={e=>{
                                        const value = e.target.value;
                                        const newData = tableRows.map((row, i) => {
                                            if(i === index){
                                                return {...row, amount: value}
                                            }
                                            else return row;
                                        });
                                        setTableRows(newData);
                                    }}/>
                                </div>
                            </td>
                            <td>
                                <div className="table-cell">{calculateVAT(item)}</div>
                            </td>
                            <td>
                                <div className="table-cell">
                                    <Input containerClass="m-0" min={0} max={20} type="number" value={item.vat} onChange={e=>{
                                        const value = e.target.value;
                                        const newData = tableRows.map((row, i) => {
                                            if(i === index){
                                                return {...row, vat: value}
                                            }
                                            else return row;
                                        });
                                        setTableRows(newData);
                                    }}/>
                                </div>
                            </td>
                            <td>
                                <div className="table-cell">
                                    <select value={item.invoicing} onChange={e => {
                                        const value = e.target.value;
                                        const newData = tableRows.map((row, i) => {
                                            if(i === index){
                                                return {...row, invoicing: value}
                                            }
                                            else return row;
                                        });
                                        setTableRows(newData);
                                    }} className="select">
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>

                                    </select>
                                </div>
                            </td>
                            <td>
                                <div className="table-cell">
                                    <div className="table-actions">
                                        <button onClick={e => {
                                            const newData = tableRows.filter((_, i) => {
                                                if(i === index){
                                                    return false
                                                }
                                                else return true;
                                            });
                                            console.log(newData);
                                            setTableRows(newData);
                                        }} className='table-action action-danger'>
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
                <button onClick={()=>setOption("")} className="button button-primary-outline">back</button>
                <button onClick={()=>setTableRows(prev => [...prev, INITIAL_EXPENSE_ROW_DATA])} className="button button-primary-outline">Add new row</button>
                <button onClick={()=>setOption("")} className="button button-primary">Save</button>
            </div>
        </div>
      ) : option === "standart" ? (
        <div className="small-container">
            <div className="card">
                <div className="row">
                    <div className="col-50">
                        <Checkbox label="Salary 1" checked={standartData.salary1} onClick={() => setStandartData(prev=>({...prev, salary1: !prev.salary1}))}/>
                    </div>
                    <div className="col-50">
                        <Checkbox label="Social insurance" checked={standartData.socialInsurance1} onClick={() => setStandartData(prev=>({...prev, socialInsurance1: !prev.socialInsurance1}))}/>
                    </div>
                    <div className="col-50">
                        <Checkbox label="Salary 2" checked={standartData.salary2} onClick={() => setStandartData(prev=>({...prev, salary2: !prev.salary2}))}/>
                    </div>
                    <div className="col-50">
                        <Checkbox label="Social insurance" checked={standartData.socialInsurance2} onClick={() => setStandartData(prev=>({...prev, socialInsurance2: !prev.socialInsurance2}))}/>
                    </div>
                    <div className="col-50">
                        <Checkbox label="Salary 3" checked={standartData.salary3} onClick={() => setStandartData(prev=>({...prev, salary3: !prev.salary3}))}/>
                    </div>
                    <div className="col-50">
                        <Checkbox label="Social insurance" checked={standartData.socialInsurance3} onClick={() => setStandartData(prev=>({...prev, socialInsurance3: !prev.socialInsurance3}))}/>
                    </div>
                    <div className="col-50">
                        <Checkbox label="Accountant" checked={standartData.accountant} onClick={() => setStandartData(prev=>({...prev, accountant: !prev.accountant}))}/>
                    </div>
                    <div className="col-50">
                        <Checkbox label="Rent" checked={standartData.rent} onClick={() => setStandartData(prev=>({...prev, rent: !prev.rent}))}/>
                    </div>
                    <div className="col-100">
                        <div className="button-group">
                            <button onClick={()=>setOption("")} className="button button-primary-outline">Back</button>
                            <button onClick={()=>setOption("")} className="button button-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      ) : (
      <div className="small-container">
        <div className="row">
          <div className="col-33">
            <button className="tile" onClick={()=>setOption("addNew")}>
              <h4 className="tile-title">Add new</h4>
            </button>
          </div>
          <div className="col-33">
            <button className="tile" onClick={()=>setOption("standart")}>
              <h4 className="tile-title">Standart</h4>
            </button>
          </div>
          <div className="col-33">
            <button className="tile">
              <h4 className="tile-title">All</h4>
            </button>
          </div>
        </div>
      </div>
      ) }
    </div>
  );
};

export default Expenses;
