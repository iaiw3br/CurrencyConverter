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

    if ( amountFromCurrency ) {
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
                const currencies = Object.keys(data.rates);
                if (currencies && currencies.length) {
                    setCurrencyOptions([data.base, ...currencies]);
                    setFromCurrency(data.base);
                    setToCurrency(currencies[0]);
                    setExchangeRate(data.rates[currencies[0]]);
                }

            });

    }, []);

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
