import React, {useEffect, useState} from 'react';

import CurrencyRow from "./CurrencyRow";

import './App.css';

const EXCHANGE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
    const [currencies, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [amountFromCurrency, setAmountFromCurrency] = useState(true);

    let toAmount;
    let fromAmount;

    if (amountFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    useEffect(() => {
        fetch(EXCHANGE_URL)
            .then(result => result.json())
            .then(data => {
                const firstCurrency = Object.keys(data.rates)[0]
                setCurrencyOptions([data.base, ...Object.keys(data.rates)])
                setFromCurrency(data.base)
                setToCurrency(firstCurrency)
                setExchangeRate(data.rates[firstCurrency])
            });

    }, []);

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${EXCHANGE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
                .then(result => result.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))

        }
    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(e) {
        setAmount(e.target.value);
        setAmountFromCurrency(true);
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value);
        setAmountFromCurrency(false);
    }

    return (
        <>
            <h1>Convert</h1>
            <CurrencyRow
                currencies={currencies}
                selectCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                amount={fromAmount}
                onChangeAmount={handleFromAmountChange}
            />
            <div className="equal">=</div>
            <CurrencyRow
                currencies={currencies}
                selectCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                amount={toAmount}
                onChangeAmount={handleToAmountChange}
            />
        </>
    );
}

export default App;
