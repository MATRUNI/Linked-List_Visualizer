import Node from "./Nodes";
import './Canvas.css'
import DrawLine from "./DrawLine";
import useDataContext from "../context/DataContext";
import { useEffect } from "react";


export default function Canvas() {

    const {nodeData, setNodeData} = useDataContext()

    const updatePosition = (id: number, x: number, y: number) => {
        setNodeData(prev => (
            prev.map(item => (
                item.id === id ? {...item, x, y} : item
            ))
        ))
    }

    return (
        <div className="canvas" style={{position: "absolute" }}>
        <svg>
        
        {nodeData && nodeData.map(node => {
            const nextNode = node.next?nodeData[node.next]: null;
              if (!nextNode) return null;
              return (
                <DrawLine
                  key={node.id}
                  id={node.id}
                  x1={node.x}
                  y1={node.y}
                  x2={nextNode!.x}
                  y2={nextNode!.y}
                  brushColor="#00b894"
                  lineWidth={3}
                />
              );
            }
        )}
        </svg>
        {nodeData.map(node => (
            <Node key={node.id} {...node} onDrag={(id, x, y) => updatePosition(id, x, y)} />
        ))}
      </div>
  );
}
