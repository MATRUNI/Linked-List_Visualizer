import { useState } from "react";
import Node from "./Nodes";
import './Canvas.css'
export default function Canvas() {
    // State stores all nodes and their current positions
    const [nodes, setNodes] = useState([
        { id: "1", x: 100, y: 100, data: "Node A", next:"2" },
        { id: "2", x: 400, y: 300, data: "Node B", next:null },
    ]);

    // Define which nodes are connected (by ID)
    const connections = [{ from: "1", to: "2" }];

    const updatePosition = (id: string, x: number, y: number) => {
        setNodes((prev) =>
            prev.map((n) => (n.id === id ? { ...n, x, y } : n))
        );
    };

    return (
        <div className="canvas" style={{position: "absolute" }}>
            <svg>                    
                <line
                    key={1}
                    x1={nodes[0].x + 25} 
                    y1={nodes[0].y + 15} 
                    x2={nodes[1].x + 25}
                    y2={nodes[1].y + 15}
                    stroke="whitesmoke"
                    strokeWidth="8"
                />
            </svg>

            {nodes.map((n) => (
                <Node 
                    key={n.id} 
                    {...n} 
                    onDrag={(x, y) => updatePosition(n.id, x, y)} 
                />
            ))}
        </div>
    );
}