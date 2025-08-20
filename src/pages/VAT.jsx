import {useState} from "react";
import Header from "../components/Header";
import DatePicker from "react-date-picker";
import { getVATStatsAPI } from "../service/api";
import FullPageLoader from "../components/FullPageLoader";

const VAT = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState(null);
    async function handleSubmit(e){
        try{
            setIsLoading(true);
            e.preventDefault();
            const response = await getVATStatsAPI();
            setIsLoading(false);
            if(response.success){
                setData(response.data);
                console.log(response.data)
            }
        }catch(err){
            console.error(err);
            setIsLoading(false);
        }
    }
  return (
    <>
    {isLoading && (
      <FullPageLoader />
    )}
    <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/" />
        {data ? (
            <>
            <div className="table-container">
                <h2 className="section-title">Issued</h2>
                <table className="table bordered">
                    <thead>
                        <tr>
                            <th>
                                <div className="table-cell">Invoice</div>
                            </th>
                            <th>
                                <div className="table-cell">Description</div>
                            </th>
                            <th>
                                <div className="table-cell">Amount</div>
                            </th>
                            <th>
                                <div className="table-cell">VAT</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.issued.items.map(item => (
                            <tr key={item.invoice}>
                                <td>
                                    <div className="table cell">{item.invoice}</div>
                                </td>
                                <td>
                                    <div className="table cell">{item.description}</div>
                                </td>
                                <td>
                                    <div className="table cell">{item.amount}</div>
                                </td>
                                <td>
                                    <div className="table cell">{item.vat}</div>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td><div className="table-cell"></div></td>
                            <td><div className="table-cell"></div></td>
                            <td><div className="table-cell font-bold">{data.issued.total.amount}</div></td>
                            <td><div className="table-cell font-bold">{data.issued.total.vat}</div></td>
                        </tr>
                    </tbody>
                </table>
                <h2 className="section-title">Expenses</h2>
                <table className="table bordered">
                    <thead>
                        <tr>
                            <th>
                                <div className="table-cell">Invoice</div>
                            </th>
                            <th>
                                <div className="table-cell">Description</div>
                            </th>
                            <th>
                                <div className="table-cell">Amount</div>
                            </th>
                            <th>
                                <div className="table-cell">VAT</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.expenses.items.map(item => (
                            <tr key={item.invoice}>
                                <td>
                                    <div className="table cell">{item.invoice}</div>
                                </td>
                                <td>
                                    <div className="table cell">{item.description}</div>
                                </td>
                                <td>
                                    <div className="table cell">{item.amount}</div>
                                </td>
                                <td>
                                    <div className="table cell">{item.vat}</div>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td><div className="table-cell"></div></td>
                            <td><div className="table-cell"></div></td>
                            <td><div className="table-cell font-bold">{data.expenses.total.amount}</div></td>
                            <td><div className="table-cell font-bold">{data.expenses.total.vat}</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="button-group">
                <button onClick={()=>setData(null)} className="button button-primary-outline">Back</button>
                <button className="button button-primary">Print</button>
            </div>
            </>
        ):(
        <div className="small-container">
            <div className="card">
            <h2 className="card-title">VAT</h2>
            <div className="row">
                <div className="col-50">
                <div className="input-container">
                    <label className="label">From</label>
                    <DatePicker onChange={setStartDate} value={startDate} />
                </div>
                </div>
                <div className="col-50">
                <div className="input-container">
                    <label className="label">Till</label>
                    <DatePicker onChange={setEndDate} value={endDate} />
                </div>
                </div>
                <div className="col-100">
                    <div className="button-group">
                        <button onClick={handleSubmit} className="button button-primary">Find</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        )}
    </div>
    </>
  );
};

export default VAT;
