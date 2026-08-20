import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import React from 'react'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"]
  },
]

function FilterCard() {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data, idx) => (
            <div key ={idx}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, index) => (
                  <div key={index} className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem value = {item}/>
                    <Label>{item}</Label>
                  </div>
                ))
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard