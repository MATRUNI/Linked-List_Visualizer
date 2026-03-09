import React, { useState } from "react";
import Nodes from "./Nodes";
import './Canvas.css'

function Canvas() {
    const [nodes, setNodes] = useState([
        { id: "1", x: 100, y: 200, data: "Node A", next: "2"},
        { id: "2", x: 200, y: 200, data: "Node B", next: '3'},
        { id: "3", x: 300, y: 200, data: "Node C", next: "4" },
        { id: "4", x: 400, y: 200, data: "Node C", next: null },
    ]);

    const updatePosition = (id: string, x: number, y: number) => {
        setNodes(prev => (
            prev.map(item => (
                item.id === id ? {...item, x, y} : item
            ))
        ))
    }

  return (
    <>
      <div 
        className="canvas"
      >
        <svg>
          {nodes.map((node, i) => {
            if(!node.next) return null;

            const target = nodes[i+1]

            return (

              <line 
                  x1={node.x + 25}
                  y1={node.y + 15}
                  x2={target.x + 25}
                  y2={target.y + 15}
                  stroke="whitesmoke"
                  strokeWidth={"2"}
              />
            )
          })}
        </svg>

        {nodes.map(node => (
            <Nodes 
              key={node.id} 
              {...node} 
              onDrag={(id, x, y) => updatePosition(id, x, y)} 
            />
        ))}
      </div>
    </>
  );
}

export default Canvas;
