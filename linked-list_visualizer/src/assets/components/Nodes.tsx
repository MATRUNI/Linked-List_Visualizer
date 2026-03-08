import type React from "react";
import { useRef, useState } from "react";
import './nodes.css'
type node={
    x:number,
    y:number,
    data:string
}


function Node({x,y,data}:node)
{
    let [position,setPosition]=useState({x,y})
    let [isDragging,setDragging]=useState(false)
    let OffSet=useRef({x:0,y:0})
    const handleMouseUp=()=>{
        setDragging(false)
    }
    const handleMouseDown=(e:React.MouseEvent)=>{
        setDragging(true);
        OffSet.current={
            x:e.clientX - position.x,
            y:e.clientY - position.y,
        }
    }
    const handleMouseMove=(e:React.MouseEvent)=>{
        if(!isDragging) return;
        console.log("Dragging")
        setPosition({
            x:e.clientX - OffSet.current.x,
            y:e.clientY - OffSet.current.y
        });
        console.log(position)
    }
    return (
        <>
        <div 
        className="node"
        style={{
            left:position.x,
            top:position.y
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseDown={(e)=>handleMouseDown(e)}
        onMouseMove={(e)=>handleMouseMove(e)}>
            <span>{data}</span>
        </div>
        </>
    )
}

export default Node;