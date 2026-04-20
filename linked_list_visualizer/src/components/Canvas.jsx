import Node from "./Nodes";
import "./Canvas.css";
import DrawLine from "./DrawLine";
import useDataContext from "../context/DataContext";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Canvas() {
  const { nodeData, setNodeData } = useDataContext();
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [pan,setPan]=useState({x:0, y:0});
  const [scale,setScale]=useState(1);

  const updatePosition = useCallback((id, x, y) => {
    const worldX = (x - pan.x) / scale;
    const worldY = (y - pan.y) / scale;
    setNodeData((prev) =>
      prev.map((item) =>
        item.id === id ? { 
          ...item, 
          x: worldX, 
          y: worldY } : item
      )
    );
  },[pan,scale,setNodeData]);
const nodeIds = useMemo(() => nodeData.map(n => n.id).join(","), [nodeData]);

  useEffect(() => {
    setVisibleNodes([]);

    nodeData.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, index * 200);
    });
  }, [nodeIds]);

  const handleZoom =useCallback((e)=>{
    e.preventDefault();
    if(!e.shiftKey) {
      return;
    }
    const zoomFactor = 0.1;
    const oldScale = scale;
    const newScale =
      e.deltaY < 0
        ? Math.min(scale + zoomFactor, 3)
        : Math.max(scale - zoomFactor, 0.2);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const newPan = {
      x: pan.x - (mouseX - pan.x) * (newScale / oldScale - 1),
      y: pan.y - (mouseY - pan.y) * (newScale / oldScale - 1),
    };
  
    setPan(newPan);
    setScale(newScale);
  },[pan,scale])

  return (
    <div className="canvas" onWheel={handleZoom} style={{ position: "absolute" }}>
      <div
      className="world"
      style={{
        height:'inherit',
        width:'inherit',
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
        transformOrigin:'0 0'
      }}
      >

      <svg>
        {nodeData &&
          nodeData.map((node) => {
            const nextNode =
              node.next !== null
                ? nodeData.find((n) => n.id === node.next)
                : null;

            if (!nextNode) return null;
            if (!visibleNodes.includes(node.id)) return null;
            if (!visibleNodes.includes(nextNode.id)) return null;

            return (
              <DrawLine
                key={node.id}
                id={node.id}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                brushColor="#00b894"
                lineWidth={4/scale}
                zoom={scale}
              />
            );
          })}
      </svg>

      {nodeData.map((node, index) => {
        if (!visibleNodes.includes(node.id)) return null;

        return (
          <Node
            key={node.id}
            {...node}
            isHead={index === 0}
            isTail={index === nodeData.length - 1}
            onDrag={(id, x, y) => updatePosition(id, x, y)}
          />
        );
      })}
      </div>
    </div>
  );
}