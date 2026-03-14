import React, { useEffect, useState } from "react";
import './Nodes.css'
import useDataContext from "../context/DataContext";

type Node = {
  id: number;
  x: number;
  y: number;
  data: string;
  isHead:boolean;
  isTail:boolean;
  next: number | null;
  onDrag: (id: number, n: number, m: number) => void;
};
function Nodes({ id, x, y, data,isHead,isTail, next, onDrag }: Node) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const {selNodeId, setSelNodeId} = useDataContext();

  const mouseDownHandler = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });

        onDrag(id, e.clientX - offset.x, e.clientY - offset.y)
      }
    };

    const mouseUpHandler = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", mouseUpHandler)
    }

  }, [isDragging]);

  useEffect(() => {
    setPosition({x, y});
  }, [x, y]);
  
  return (
    <>
      <div
        className="node"
        onMouseDown={mouseDownHandler}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
          backgroundColor: 
          selNodeId == id 
          ? "red" 
          :isHead
          ?"#0984e3"
          :isTail
          ?"#e17055"
          : "rgba(45, 52, 54, 0.9)",
        }}
        onClick={() => setSelNodeId(id)}
      >
        <div>ID: {id}</div>
        <div>{data}</div>
        <div>Next: {next ? next : "NULL"}</div>
      </div>
    </>
  );
}

export default Nodes;
