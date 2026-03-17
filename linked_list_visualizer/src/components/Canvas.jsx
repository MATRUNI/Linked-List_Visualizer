import Node from "./Nodes";
import "./Canvas.css";
import DrawLine from "./DrawLine";
import useDataContext from "../context/DataContext";
import { useState, useEffect } from "react";

export default function Canvas() {
  const { nodeData, setNodeData } = useDataContext();
  const [visibleNodes, setVisibleNodes] = useState([]);

  const updatePosition = (id, x, y) => {
    setNodeData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, x, y } : item
      )
    );
  };

  useEffect(() => {
    setVisibleNodes([]);

    nodeData.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, index * 200);
    });
  }, [nodeData.map((n) => n.data).join(",")]);

  return (
    <div className="canvas" style={{ position: "absolute" }}>
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
                lineWidth={3}
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
  );
}