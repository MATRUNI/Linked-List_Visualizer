import React, { useState } from 'react'
import './Input.css'

function Input() {
    const [input, setInput] = useState("")

    const handleSubmit = (e:React.SubmitEvent) => {
        e.preventDefault();
        const arr = input.split(/[\s,]+/).map(val => val)
        console.log(arr)
    }
  return (
    <>
      <form className='inputDiv' onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder='Enter val (space or comma seperated)'
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button className='btn'>Submit</button>
      </form>
    </>
  )
}

export default Input
