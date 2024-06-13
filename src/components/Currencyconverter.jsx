import React, { useEffect } from 'react'
import { useState } from 'react'
import Dropdown from './Dropdown'
import { HiArrowsRightLeft } from 'react-icons/hi2'
const Currencyconverter = () => {

    const [currencies, setcurrencies] = useState([])
    const [amount, setAmount] = useState(1)
    const [fromcurrency, setFromcurrency] = useState('USD')
    const [tocurrency, setTocurrency] = useState('INR')
    const [convertedamount, setConvertedamount] = useState(0)
    const [converting, setConverting] = useState(false)
    const [favourite, setFavourite] = useState(JSON.parse(localStorage.getItem('favourite')) || ["INR"])
    

    const fetchcurrencies = async () => {
        try {
            const res = await fetch('https://api.frankfurter.app/currencies')
            const data = await res.json()
            setcurrencies(Object.keys(data));
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        fetchcurrencies();
    }, [])
    console.log(currencies)

    const convertcurrency = async () => {
        if (!amount) return
        setConverting(true)
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromcurrency}&to=${tocurrency}`)
            const data = await res.json()
            setConvertedamount(data.rates[tocurrency])
            setConverting(false)
        } catch (error) {
            console.log(error)
        }
    }
        
    const handlefavourite = (currency) => {
        let updatefavourite = [...favourite]
        if (updatefavourite.includes(currency)) {
            updatefavourite = updatefavourite.filter((c) => c !== currency)
        } else {
            updatefavourite = [...updatefavourite, currency]
        }
        setFavourite(updatefavourite)
        localStorage.setItem('favourite', JSON.stringify(updatefavourite))
    }

    const swapcurrency = () => {
        setFromcurrency(tocurrency)
        return (
            setTocurrency(fromcurrency)
        )}
    return (
        < div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md' >

            <h2 className='mb-5 text-2xl font-semibold text-gray-700'>
                Currency Converter
            </h2>
            <div>
                <Dropdown currencies={currencies} favourite={favourite} title="From:" handlefavourite={handlefavourite} currency={fromcurrency} setcurrency={setFromcurrency} />
                {/*swap*/}
                <button onClick={swapcurrency} className='mgl-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400 focus:ring-offset-2'>
                    <HiArrowsRightLeft />
                </button>
                <Dropdown currencies={currencies} favourite={favourite} title="To:" handlefavourite={handlefavourite} currency={tocurrency} setcurrency={setTocurrency} />
            </div>
            <div className='mt-4'>
                <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>Amount:</label>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type='number' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2' />
            </div>
            <div className='flex justify-end mt-6'>
                <button onClick={convertcurrency} className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:ring-offset-2 ${converting?"animate-pulse":""}'>Convert</button>
            </div>
            <div className='mt-4 text-lg font-medium text-right text-green-600'>
                Convert amount: {convertedamount}
            </div>
        </div >
    )
}

export default Currencyconverter
