import React, { useState } from 'react'
import './Input.css'
import useDataContext from '../context/DataContext'

function Input() {
    const [input, setInput] = useState("")
    let arr:string[] 
    let inputNodeData=[]
    let height=100,width=100;
    const [error, setError] = useState("");
    const {nodeData, setNodeData} = useDataContext()

    if(nodeData.length > 0) {
      height = nodeData[0].x;
      width = nodeData[0].y;
    }
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
        // console.log(arr)
        for(let i=0;i<arr.length;i++)
        {
          inputNodeData.push({id:i,x:height,y:width,data:arr[i],next:i+1===arr.length?null:i+1})
          width+=200
        }
        console.log(nodeData)
        setNodeData(prev => inputNodeData);
        // console.log(nodeData)
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
