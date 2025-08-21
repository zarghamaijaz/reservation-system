import { useState } from "react";
import Header from "../components/Header";
import DatePicker from "react-date-picker";
import { getProfitLossStatsAPI } from "../service/api";
import FullPageLoader from "../components/FullPageLoader";
import { useNavigate } from "react-router";

const ProfitLoss = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState(null);
  async function handleSubmit(e) {
    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await getProfitLossStatsAPI();
      setIsLoading(false);
      if (response.success) {
        setData(response.data);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/" />
        <div className="small-container">
          <div className="card">
            <h2 className="card-title">Profit/loss</h2>
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
              {data && (
                <>
                  <div className="col-100">
                    <div className="detail-container">
                      <div className="detail-name">Total invoices issued</div>
                      <div className="detail-value">
                        {data.totalInvoicesIssued}
                      </div>
                    </div>
                    <div className="detail-container">
                      <div className="detail-name">Total expense paid</div>
                      <div className="detail-value">
                        {data.totalExpensePaid}
                      </div>
                    </div>
                    <div className="detail-container">
                      <div className="detail-name">Profit</div>
                      <div className="detail-value">{data.profit}</div>
                    </div>
                  </div>
                </>
              )}
              <div className="col-100">
                <div className="button-group">
                  <button onClick={()=>navigate("/")} className="button button-primary-outline">Cancel</button>
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
      </div>
    </>
  );
};

export default ProfitLoss;
