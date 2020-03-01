import React from "react";

export default function CurrencyRow({currencies, selectCurrency, onChangeCurrency, amount, onChangeAmount}) {
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