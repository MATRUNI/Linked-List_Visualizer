import type React from "react";
import { useEffect, useRef, useState } from "react";
import './nodes.css'
type nodePos={
    id:string;
    x:number;
    y:number;
    data:string;
    next:string|null;
    onDrag:(x:number,y:number)=>void;
}


function Node({id,x,y,data,next,onDrag}:nodePos)
{
    let [position,setPosition]=useState({x,y})
    let [isDragging,setDragging]=useState(false)
    let offSet=useRef({x:0,y:0})

    const handleMouseDown=(e:React.MouseEvent)=>{
        setDragging(true);
        offSet.current={
            x:e.clientX - position.x,
            y:e.clientY - position.y,
        }
    }
    useEffect(()=>{
        const handleMouseMove=(e:MouseEvent)=>{
            if(!isDragging) return;
            setPosition({
                x: e.clientX - offSet.current.x,
                y: e.clientY - offSet.current.y
            });
            onDrag(e.clientX - offSet.current.x, e.clientY - offSet.current.y);
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
        <div>ID: {id}</div>
        <div>{data}</div>
        <div>Next: {next?next:"null"}</div>
        </div>
        </>
    )
}

export default Node;
