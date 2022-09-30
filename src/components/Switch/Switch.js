import React from "react";
import "./Switch.css";

const Switch = ({label, ...restProps}) => {
  
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        className="toggle-button"
        data-testid="switch"
        {...restProps}
      />
      <label>{label}</label>
    </div>
  );
}

export default Switch;
export { Switch };
