import { useState } from "react";
import Header from "../components/Header";
import DatePicker from "react-date-picker";
import { getVATStatsAPI } from "../service/api";
import FullPageLoader from "../components/FullPageLoader";
import { useNavigate } from "react-router";

const VAT = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState(null);
  async function handleSubmit(e) {
    try {
      setIsLoading(true);
      e.preventDefault();
      const payload = {
        start_date: startDate,
        end_date: endDate,
      };
      const response = await getVATStatsAPI(payload);
      setIsLoading(false);
      setData(response);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="p-4">
        <Header backLink="/driving-instructor-home" />

        <div className="small-container">
          <div className="card">
            <h2 className="card-title">VAT</h2>
            <div className="row">
              <div className="col-50">
                <div className="input-container">
                  <label className="label">From</label>
                  <DatePicker
                    format="dd/MM/yyyy"
                    onChange={setStartDate}
                    value={startDate}
                  />
                </div>
              </div>
              <div className="col-50">
                <div className="input-container">
                  <label className="label">Till</label>
                  <DatePicker
                    format="dd/MM/yyyy"
                    onChange={setEndDate}
                    value={endDate}
                  />
                </div>
              </div>
              <div className="col-100">
                <div className="button-group">
                  <button
                    onClick={() => navigate("/driving-instructor-home")}
                    className="button button-primary-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="button button-primary"
                  >
                    Find
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {data && (
          <>
            <div className="table-container">
              <h2 className="section-title">Issued</h2>
              <table className="table bordered card">
                <thead>
                  <tr>
                    <th>
                      <div className="table-cell">Category</div>
                    </th>
                    <th>
                      <div className="table-cell">From</div>
                    </th>
                    <th>
                      <div className="table-cell">Vat %</div>
                    </th>
                    <th>
                      <div className="table-cell">VAT amount</div>
                    </th>
                    <th>
                      <div className="table-cell">Total amount</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.vat_breakdown.map((item) => (
                    <tr key={item.invoice}>
                      <td>
                        <div className="table cell">{item.category}</div>
                      </td>
                      <td>
                        <div className="table cell">
                          {item.transaction_count}
                        </div>
                      </td>
                      <td>
                        <div className="table cell">{item.vat_percentage}</div>
                      </td>
                      <td>
                        <div className="table cell">{item.vat_amount}</div>
                      </td>
                      <td>
                        <div className="table cell">{item.total_amount}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="small-container">
                <div className="card mt-8">
                  <div className="detail-container">
                    <div className="detail-name">VAT from expenses:</div>
                    <div className="detail-value">{data.vat_from_expenses}</div>
                  </div>
                  <div className="detail-container">
                    <div className="detail-name">VAT from revenue:</div>
                    <div className="detail-value">{data.vat_from_revenue}</div>
                  </div>
                  <div className="detail-container">
                    <div className="detail-name">VAT to pay Government:</div>
                    <div className="detail-value">{data.vat_to_pay_government}</div>
                  </div>
                </div>
            </div>
            <div className="button-group">
              <button
                onClick={() => setData(null)}
                className="button button-primary-outline"
              >
                Back
              </button>
              {/* <button className="button button-primary">Print</button> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VAT;
