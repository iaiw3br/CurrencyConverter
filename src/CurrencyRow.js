import React from "react";

export default function CurrencyRow(props) {
    const {
        currencies,
        selectCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props;

    if ( isNaN(amount) ) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
            <select value={selectCurrency} onChange={onChangeCurrency}>
                {currencies.map(currency => (
                    <option value={currency} key={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}