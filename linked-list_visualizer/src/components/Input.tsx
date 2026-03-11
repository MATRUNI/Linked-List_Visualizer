import React, { useState } from 'react'
import './Input.css'

function Input() {
    const [input, setInput] = useState("")
    let arr:string[] 
    let nodeData=[]
    let height=400,width=400;
    const [error, setError] = useState("");

    const handleSubmit = (e:React.SubmitEvent) => {
        e.preventDefault();
        if(!input) {
            setError("Please provide some value first")
            return;
        }
        arr= input.split(",");
        if(arr.length===1)
        {
          arr=input.split(" ");
        }
        console.log(arr)
        for(let i=0;i<arr.length;i++)
        {
          nodeData.push({id:i,x:height,y:width,data:arr[i],next:i+1===arr.length?null:i+1})
          width+=200
        }
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
