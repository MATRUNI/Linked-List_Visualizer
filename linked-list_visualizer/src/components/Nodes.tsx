import React, { useEffect, useState } from "react";
import './Nodes.css'

type Node = {
 id: number;
  x: number;
  y: number;
  data: string;
  next:number|null;
  onDrag: (id: number, n: number, m: number) => void,
};
function Nodes({ id, x, y, data,next, onDrag }: Node) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const mouseDownHandler = (e: React.MouseEvent) => {
    console.log("Down called");
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
      console.log("up called");
      setIsDragging(false);
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", mouseUpHandler)
    }
    

  }, [isDragging]);
  return (
    <>
      <div
        className="node"
          onMouseDown={mouseDownHandler}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging?"grabbing":"grab"
        }}
      >
        <div>ID: {id}</div>
        <div>{data}</div>
        <div>Next: {next?next:"NULL"}</div>
      </div>
    </>
  );
}

export default Nodes;
