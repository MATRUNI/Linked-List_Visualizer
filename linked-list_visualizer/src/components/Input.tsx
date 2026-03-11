import React, { useState } from 'react'
import './Input.css'

function Input() {
    const [input, setInput] = useState("")
    const [error, setError] = useState("");

    const regex = /^(\d+(?:[ ,]\d+)*|[A-Z]+(?:[ ,][A-Z]+)*|[a-z]+(?:[ ,][a-z]+)*)$/

    const handleSubmit = (e:React.SubmitEvent) => {
        if(!input) {
            setError("Please provide some value first")
            return;
        }
        // regex.test(input)
        e.preventDefault();
        let arr:string[] = input.split(",");
        if(arr.length===1)
        {
          arr=input.split(" ");
        }
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
        {error && <p className='error'>{error}</p>}
        <button className='btn'>Submit</button>
      </form>
    </>
  )
}

export default Input
