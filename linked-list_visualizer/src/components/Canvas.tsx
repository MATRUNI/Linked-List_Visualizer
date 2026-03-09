import { useState } from "react";
import Node from "./Nodes";
import './Canvas.css'
import DrawLine from "./DrawLine";
export default function Canvas() {
    // State stores all nodes and their current positions
    const [nodes, setNodes] = useState([
        { id: 0, x: 400, y: 400, data: "Node A", next: 1},
        { id: 1, x: 600, y: 400, data: "Node B", next: 2},
        { id: 2, x: 800, y: 400, data: "Node C", next: null },
    ]);

    const updatePosition = (id: number, x: number, y: number) => {
        setNodes(prev => (
            prev.map(item => (
                item.id === id ? {...item, x, y} : item
            ))
        ))
    }
    return (
        <div className="canvas" style={{position: "absolute" }}>
        <svg>
        {nodes.map(node => {
            const nextNode = node.next?nodes[node.next]: null;
              if (!nextNode) return null;
              return (
                <DrawLine
                  key={node.id}
                  id={node.id}
                  x1={node.x}
                  y1={node.y}
                  x2={nextNode!.x}
                  y2={nextNode!.y}
                  brushColor="red"
                  lineWidth={5}
                />
              );
            }
        )}
        </svg>
        {nodes.map(node => (
            <Node key={node.id} {...node} onDrag={(id, x, y) => updatePosition(id, x, y)} />
        ))}
      </div>
  );
}
