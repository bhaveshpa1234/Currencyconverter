import React from 'react'
import { HiOutlineStar, HiStar } from 'react-icons/hi'

const Dropdown = ({
    currencies,
    currency,
    setcurrency,
    favourite,
    handlefavourite,
    title="",
}) => {

    const isfavourite = (curr) => favourite?.includes(curr)

  return (
    <div>
      <label htmlFor={title} className='block text-sm font-medium text-gray-700'>{title}</label>

      <div className='mt-1'>
        <select value={currency} onChange={(e) => setcurrency(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2'>
            
            {favourite.map((currency) => {
                return (<option className='bg-gray-200' value={currency} key={currency}
                >{currency}
                </option>
                )
            })}
            {currencies.filter((c)=>!favourite.includes(c))
            .map((currency) => {
                return (<option value={currency} key={currency}
                >{currency}
                </option>
                )
            })}
            
            
            
        </select>
        <button onClick={() => handlefavourite(currency)} className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:ring-offset-1'>
            {isfavourite(currency)?
            <HiStar />
            :
            <HiOutlineStar />
            }
        </button>
      </div>
    </div>
  )
}

export default Dropdown
