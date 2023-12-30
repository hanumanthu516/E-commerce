import axios from "axios";
import React, { useEffect, useState } from "react";
import ExchangeIcon from "../../../assets/exchange.svg";
import CurrencySelect from "../corrency-converter/CurrencySelect";

const CurrencyConverter = () => {
  const [initialValues, setinitialValues] = useState({
    exchangeRates: {},
    amount: "",
    fromCurrency: "",
    toCurrency: "",
    convertedAmount: null,
    buttonStatus: false,
  });

  useEffect(() => {
    axios
      .get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr.json"
      )
      .then((jsonData) =>
        setinitialValues((prev) => ({
          ...prev,
          exchangeRates: jsonData.data.inr,
        }))
      )
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (!initialValues.amount) {
      setinitialValues((prev) => ({
        ...prev,
        convertedAmount: null,
        buttonStatus: false,
      }));
    }
  }, [initialValues.amount]);

  const handleConversion = () => {
    const { fromCurrency, toCurrency, amount, exchangeRates } = initialValues;

    if (!fromCurrency || !toCurrency || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const sourceRate = exchangeRates[fromCurrency];
    const targetRate = exchangeRates[toCurrency];

    if (sourceRate === undefined || targetRate === undefined) {
      alert("Exchange rates not available for the selected currencies");
      return;
    }

    const result = (amount / sourceRate) * targetRate;
    setinitialValues((prev) => ({
      ...prev,
      convertedAmount: result,
      buttonStatus: true,
    }));
    initialValues.buttonStatus = true;
  };

  const handleExchange = () => {
    setinitialValues((prev) => ({
      ...prev,
      fromCurrency: initialValues.toCurrency,
      toCurrency: initialValues.fromCurrency,
    }));
  };

  return (
    <div className="d-flex align-items-center justify-content-around">
      <span className="mb-3">Currecny converter</span>
      <div className="mb-3">
        <input
          className="form-control"
          type="number"
          value={initialValues.amount}
          onChange={(e) =>
            setinitialValues((prev) => ({
              ...prev,
              amount: e.target.value,
            }))
          }
          placeholder="Enter amount"
        />
      </div>

      {Object.keys(initialValues.exchangeRates)?.length > 0 && (
        <>
          <CurrencySelect
            name="fromCurrency"
            base="From currency"
            options={Object.keys(initialValues.exchangeRates)}
            value={initialValues.fromCurrency}
            onChange={(e) =>
              setinitialValues((prev) => ({
                ...prev,
                fromCurrency: e.target.value,
              }))
            }
          />
        </>
      )}

      <div>
        <button
          className="btn btn-outline-primary mb-3"
          type="button"
          onClick={handleExchange}
          disabled={!initialValues.fromCurrency || !initialValues.toCurrency}
        >
          <img src={ExchangeIcon} alt="Exchange" />
        </button>
      </div>

      {Object.keys(initialValues.exchangeRates)?.length > 0 && (
        <>
          <CurrencySelect
            name="toCurrency"
            base="To currency"
            options={Object.keys(initialValues.exchangeRates)}
            value={initialValues.toCurrency}
            onChange={(e) =>
              setinitialValues((prev) => ({
                ...prev,
                toCurrency: e.target.value,
              }))
            }
          />
        </>
      )}

      <button
        className="btn btn-primary mb-3 "
        type="button"
        onClick={handleConversion}
        disabled={
          !initialValues.amount ||
          !initialValues.fromCurrency ||
          !initialValues.toCurrency
        }
      >
        {!initialValues.buttonStatus || !initialValues.amount
          ? "Calculate"
          : "Re Calculate"}
      </button>

      {initialValues.convertedAmount !== null && (
        <div className="mb-3">
          <h3>
            {initialValues.convertedAmount} {initialValues.toCurrency}
          </h3>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
