import React, { useState } from 'react'
import './Input.css'

function Input() {
    const [input, setInput] = useState("")

    const handleSubmit = () => {
        // if()
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
        <button>Submit</button>
      </form>
    </>
  )
}

export default Input
