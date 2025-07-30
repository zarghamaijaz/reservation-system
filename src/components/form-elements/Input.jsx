import React from "react";

const Input = ({ label, id, info, ...otherProps }) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        className="input"
        {...otherProps}
      />
      {info && <div className="input-info">{info}</div>}
    </div>
  );
};

export default Input;
