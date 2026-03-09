import { useState } from "react";
import Node from "./Nodes";
import './Canvas.css'
import DrawLine from "./DrawLine";
export default function Canvas() {
    // State stores all nodes and their current positions
    const [nodes, setNodes] = useState([
        { id: "1", x: 400, y: 250, data: "Node A", next: "2"},
        { id: "2", x: 100, y: 130, data: "Node B", next: '3'},
        { id: "3", x: 200, y: 50, data: "Node C", next: null },
    ]);

    const updatePosition = (id: string, x: number, y: number) => {
        setNodes(prev => (
            prev.map(item => (
                item.id === id ? {...item, x, y} : item
            ))
        ))
    }

    return (
        <div className="canvas" style={{position: "absolute" }}>                
                
                    <DrawLine id={"1"} 
                    x1={nodes[0].x + 25} 
                    y1={nodes[0].y + 15} 
                    x2={nodes[1].x + 25}
                    y2={nodes[1].y + 15}
                    brushColor="white"
                    lineWidth={5}/>

        {nodes.map(node => (
            <Nodes key={node.id} {...node} onDrag={(id, x, y) => updatePosition(id, x, y)} />
        ))}
      </div>
    </>
  );
}

export default Canvas;
