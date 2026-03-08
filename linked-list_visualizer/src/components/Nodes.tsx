import type React from "react";
import { useEffect, useRef, useState } from "react";
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

    const handleMouseDown=(e:React.MouseEvent)=>{
        setDragging(true);
        OffSet.current={
            x:e.clientX - position.x,
            y:e.clientY - position.y,
        }
    }
    useEffect(()=>{
        const handleMouseMove=(e:MouseEvent)=>{
            if(!isDragging) return;
            console.log("Dragging")
            setPosition({
                x:e.clientX - OffSet.current.x,
                y:e.clientY - OffSet.current.y
            });
            console.log(position)
        }
        const handleMouseUp=()=> setDragging(false);

        if(isDragging)
        {
            window.addEventListener("mousemove",handleMouseMove)
            window.addEventListener("mouseup",handleMouseUp)
        }
        return ()=>{
            window.removeEventListener("mousemove",handleMouseMove)
            window.removeEventListener("mouseup",handleMouseUp)
        }
    },[isDragging])
    return (
        <>
        <div 
        className="node"
        onMouseDown={handleMouseDown}
        style={{
            left:position.x,
            top:position.y
        }}
        >
        {data}
        </div>
        </>
    )
}

export default Node;