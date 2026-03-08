import React, { useState } from 'react'

type node = {
    x: number,
    y: number,
    data: string
}
function Nodes() {

    const nodes: node[] = [
        {x: 200, y: 150, data: "Node A"},
        {x: 200, y: 150, data: "Node B"},
        {x: 200, y: 150, data: "Node C"},
    ]

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({x: 200, y: 150})
    const [offset, setOffset] = useState({x: 0, y: 0})

    const mouseDownHandler = (e:React.MouseEvent<HTMLDivElement>) => {
        console.log("Down called")
        setIsDragging(true)
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        })
    }
    const mouseUpHandler = () => {
        console.log("up called")
        setIsDragging(false)
    }
    const mouseMoveHandler = (e:React.MouseEvent<HTMLDivElement>) => {
        if(isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    }
  return (
    <>
        <div
            onMouseUp={mouseUpHandler}
            onMouseDown={mouseDownHandler}
            onMouseMove={mouseMoveHandler}
            style={{
                userSelect: "none",
                cursor: 'grab',
                backgroundColor: 'gray',
                padding: '10px 15px',
                position: "absolute",
                left:`${position.x}px`,
                top:`${position.y}px`,
                
            }}
        >
            <span>
                {nodes[0].data}
            </span>
        </div>
    </>
  ) 
}

export default Nodes
