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
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
            });

    }, []);

    return (
        <>
            <h1>Convert</h1>
            <CurrencyRow
                currencies={currencies}
            />
            <div className="equal">=</div>
            <CurrencyRow
                currencies={currencies}
            />
        </>
    );
}

export default App;
