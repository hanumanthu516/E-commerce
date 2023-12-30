import React from "react";

const CurrencySelect = ({ base, name, options, value, onChange }) => {
  return (
    <div className="mb-3">
      <select
        name={name}
        id={name}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        <option value="">{base}</option>
        {options?.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
