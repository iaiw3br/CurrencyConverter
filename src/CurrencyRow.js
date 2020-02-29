import React from "react";

export default function CurrencyRow({currencies}) {
    return (
        <div>
            <input type="number" className='input'/>
            <select>
                {
                    currencies.map(currency => (
                        <option
                            value={currency}
                            key={currency}
                        >
                            {currency}
                        </option>
                    ))
                }

            </select>
        </div>
    );
}