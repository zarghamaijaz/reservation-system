import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const Checkbox = ({ label, id, checked = false, onClick }) => {
    function handleClick(e){
        e.preventDefault();
        onClick();
    }
  return (
    <div className="checkbox-container">
      <label htmlFor={id}>{label}</label>
      <button onClick={handleClick} id={id} className={`checkbox ${checked ? "checked" : ""}`}>
        {checked && <IoMdCheckmark />}
      </button>
    </div>
  );
};

export default Checkbox;
