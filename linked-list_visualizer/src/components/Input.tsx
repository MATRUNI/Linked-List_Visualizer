import React, { useState } from "react";
import "./Input.css";
import useDataContext from "../context/DataContext";

type NodeData = {
  id: number;
  x: number;
  y: number;
  data: string;
  next: number | null;
};

function Input() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { nodeData, setNodeData, selNodeId, setSelNodeId } = useDataContext();

  let arr: string[];
  let inputNodeData = [];
  const CANVAS_WIDTH = window.innerWidth;
  // const CANVAS_HEIGHT = window.innerHeight;
  const NODE_WIDTH = 192;
  const NODE_HEIGHT = 160;
  const H_GAP = 50;
  const V_GAP = 50;

  const NODES_PER_ROW = Math.floor(
    (CANVAS_WIDTH + H_GAP) / (NODE_WIDTH + H_GAP),
  );
  const testData =
    "Break problems into smaller solvable pieces, Read errors carefully before writing more code, Write code for humans first computers second, Test early test often prevent silent failures, Simple solutions scale better than complex ones, Understand the problem before optimizing performance, Version control is your safety net always, Automate repetitive tasks whenever possible, Good naming saves hours of future debugging, Never stop learning new tools and paradigms";

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!input) {
      setError("Please provide some value first");
      return;
    }
    setError("");
    setSelNodeId(null);
    arr = input.split(",");
    if (arr.length === 1) {
      arr = input.split(" ");
    }

    for (let i = 0; i < arr.length; i++) {
      const row = Math.floor(i / NODES_PER_ROW);
      const col = i % NODES_PER_ROW;

      inputNodeData.push({
        id: i,
        x: col * (NODE_WIDTH + H_GAP),
        y: row * (NODE_HEIGHT + V_GAP),
        data: arr[i],
        next: i + 1 === arr.length ? null : i + 1,
      });
    }
    setNodeData((prev) => inputNodeData);
    setInput("");
  };
  
  const putData = () => {
    setInput(testData);
  };

  // write the logic for delete node but not working properly
  const deleteNode = () => {
    // console.log(selNodeId)
    if (selNodeId) {
      console.log(nodeData);
      let deletedData : NodeData[] = []

      let i = 0;
      for(let i=0; i<nodeData.length; i++) {
        console.log(i)
        console.log(nodeData[i])
        if(nodeData[i].id === selNodeId) {
          console.log(nodeData[i]);
          continue;
        }
        if(nodeData[i] && nodeData[i].next === selNodeId) {
          deletedData[i] = {...nodeData[i], next: nodeData[i+1].next}
        }
        else {
          deletedData[i] = {...nodeData[i]}
        }
      }
      setNodeData(deletedData);
    }
  };

  const clearInput = () => {
    setInput("");
  };

  return (
    <>
      <form className="inputDiv" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter val (space or comma seperated)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {input && (
            <button onClick={clearInput} className="clear-btn">
              X
            </button>
          )}
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn">Make Nodes</button>
        <div>
          <button className="btn" onClick={putData}>
            Load Test Data
          </button>
        </div>
        <div>
          <button className="btn" onClick={deleteNode}>
            Delete Node
          </button>
        </div>
      </form>
    </>
  );
}

export default Input;
