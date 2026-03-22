import React, { useEffect, useState } from "react";
import "./Nodes.css";
import useDataContext from "../context/DataContext";

function Nodes({ id, x, y, data, isHead, isTail, next, onDrag }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { selNodeId, setSelNodeId } = useDataContext();

  const mouseDownHandler = (e) => {
    e.preventDefault();
    setIsDragging(true);
  const rect = e.currentTarget.getBoundingClientRect();

  setOffset({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  });
  };

  useEffect(() => {
    const mouseMoveHandler = (e) => {
      if (isDragging) {
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;

        setPosition({ x: newX, y: newY });
        onDrag(id, newX, newY);
      }
    };

    const mouseUpHandler = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [isDragging, offset, id, onDrag]);

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  return (
    <div
      className="node"
      onMouseDown={mouseDownHandler}
      onClick={() => setSelNodeId(id)}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        cursor: isDragging ? "grabbing" : "grab",
        backgroundColor:
            isHead
            ? "#0984e3"
            : isTail
            ? "#e17055"
            : "rgba(45, 52, 54, 0.9)",
        border:selNodeId=== id ? "2px solid #55efc4" : "2px solid transparent",
        outline: selNodeId === id ? "3px solid #55efc4" : "none", 
        boxShadow: selNodeId === id ? "0 0 15px rgb(255, 255, 255)" : "none",
      }}
    >
      <div id="ids">ID: {id}</div>
      <div id="data">{data}</div>
      <div id="next">Next: {next ? next : "NULL"}</div>
    </div>
  );
}

export default Nodes;