import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";

const Detail = ({ name, value }) => {
  return (
    <div className="detail-container">
      <div className="detail-name">{name}</div>
      <div className="detail-value">{value}</div>
    </div>
  );
};

const CustomerDetails = () => {
    const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/all-customers" />
        <div className="small-container">
          <div className="card">
            <Detail name="Name" value="Zargham" />
            <Detail name="ID" value="123456789" />
            <Detail name="Date of birth" value="2025/01/01" />
            <Detail name="Visa expire" value="2025/01/01" />
            <Detail name="Learning expire" value="2025/01/01" />
            <Detail name="Category" value="CE" />
            <Detail name="Car no plate" value="123456" />
            <Detail name="Phone" value="03238404499" />
          </div>
        </div>
        <div className="button-group">
            <button onClick={e => {
                e.preventDefault();
                navigate("/all-customers")
            }} className="button button-primary-outline">Exit</button>
            <button className="button button-primary-outline">Save</button>
            <button onClick={e => {
                e.preventDefault();
                navigate("/customer-lessons")
            }} className="button button-primary">Next</button>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
