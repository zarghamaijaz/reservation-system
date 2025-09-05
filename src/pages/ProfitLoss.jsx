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
      const payload = {
        start_date: startDate,
        end_date: endDate,
      }
      const response = await getProfitLossStatsAPI(payload);
      setIsLoading(false);
      if (response) {
        console.log(response)
        setData(response);
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
        <Header backLink="/driving-instructor-home" />
        <div className="small-container">
          <div className="card">
            <h2 className="card-title">Profit/loss</h2>
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
              {data && (
                <>
                  <div className="col-100">
                    <div className="detail-container">
                      <div className="detail-name">Total invoices issued</div>
                      <div className="detail-value">
                        {data.total_revenue}
                      </div>
                    </div>
                    <div className="detail-container">
                      <div className="detail-name">Total expense paid</div>
                      <div className="detail-value">
                        {data.total_expenses}
                      </div>
                    </div>
                    <div className="detail-container">
                      <div className="detail-name">Profit</div>
                      <div className="detail-value">{data.profit_loss}</div>
                    </div>
                  </div>
                </>
              )}
              <div className="col-100">
                <div className="button-group">
                  <button onClick={()=>navigate("/driving-instructor-home")} className="button button-primary-outline">Cancel</button>
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
