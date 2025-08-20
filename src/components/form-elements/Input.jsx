import React from "react";

const Input = ({ label, id, info, limit, onChange, ...otherProps }) => {
  function handleChange(e){
    if(limit){
      const length = e.target.value.length;
      if(length <= limit){
        onChange(e);
      }
    }
    else{
      onChange(e);
    }
  }
  return (
    <div className="input-container">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        onChange={handleChange}
        id={id}
        className="input"
        {...otherProps}
      />
      {info && <div className="input-info">{info}</div>}
    </div>
  );
};

export default Input;
