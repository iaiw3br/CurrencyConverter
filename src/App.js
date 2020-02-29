import React, {useEffect, useState} from 'react';

import CurrencyRow from "./CurrencyRow";

import './App.css';

const EXCHANGE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
    const [currencies, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();

    useEffect(() => {
        fetch(EXCHANGE_URL)
            .then(result => result.json())
            .then(data => {
                const currencies = Object.keys(data.rates);
                if (currencies && currencies.length) {
                    setCurrencyOptions([data.base, ...currencies]);
                    setFromCurrency(data.base);
                    setToCurrency(currencies[0]);
                }

            });

    }, []);

    return (
        <>
            <h1>Convert</h1>
            <CurrencyRow
                currencies={currencies}
                selectCurrency={fromCurrency}
            />
            <div className="equal">=</div>
            <CurrencyRow
                currencies={currencies}
                selectCurrency={toCurrency}
            />
        </>
    );
}

export default App;
