import React, { useState } from "react";
import "./Input.css";
import useDataContext from "../context/DataContext";
import BeforeAfterToggle from "./BeforeAfterToggle";

function Input() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { nodeData, setNodeData, selNodeId, setSelNodeId,hasNodes, isAfter } = useDataContext();

  const CANVAS_WIDTH = window.innerWidth;
  const NODE_WIDTH = 192;
  const NODE_HEIGHT = 240;
  const H_GAP = 100;
  const V_GAP = 100;

  const NODES_PER_ROW = Math.floor(
    (CANVAS_WIDTH + H_GAP) / (NODE_WIDTH + H_GAP)
  );

  const testData =
    "Break problems into smaller solvable pieces, Read errors carefully before writing more code, Write code for humans first computers second, Test early test often prevent silent failures, Simple solutions scale better than complex ones, Understand the problem before optimizing performance, Version control is your safety net always, Automate repetitive tasks whenever possible, Good naming saves hours of future debugging, Never stop learning new tools and paradigms";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      setError("Please provide some value first");
      return;
    }

    setError("");
    setSelNodeId(null);

    let arr = input.split(",");
    if (arr.length === 1) {
      arr = input.split(" ");
    }

    const inputNodeData = [];

    for (let i = 0; i < arr.length; i++) {
      const row = Math.floor(i / NODES_PER_ROW);
      const col = i % NODES_PER_ROW;

      inputNodeData.push({
        id: Date.now() + i,
        x: col * (NODE_WIDTH + H_GAP),
        y: row * (NODE_HEIGHT + V_GAP),
        data: arr[i],
        next: i + 1 === arr.length ? null : Date.now() + i + 1,
      });
    }

    setNodeData(inputNodeData);
    setInput("");
  };

  const putData = () => {
    setInput(testData);
  };

  // ✅ FIXED delete logic
  const deleteNode = () => {
    if (!selNodeId) return;

    const updated = nodeData
      .filter((node) => node.id !== selNodeId) // remove selected
      .map((node) => {
        if (node.next === selNodeId) {
          const nextNode = nodeData.find(n => n.id === selNodeId);
          return {
            ...node,
            next: nextNode ? nextNode.next : null,
          };
        }
        return node;
      });

    setNodeData(updated);
    setSelNodeId(null);
  };

  const clearInput = () => {
    setInput("");
  };


  const handleAppend = () => {
    if (!selNodeId) {
      return;
    }
    else if (!input) {
      setError("Please provide some value first");
      return;
    }
    setError("");
    setSelNodeId(null);

    let arr = input.split(",");
    if (arr.length === 1) {
      arr = input.split(" ");
    }

    const newNodeData =[];
    nodeData.forEach((element, index) => {
      if(selNodeId===element.id)
      {
        let nodes=createNodeDataArray(arr);
        if(isAfter)
        {
          nodes[nodes.length-1].next=element.next;
          element.next=nodes[0].id;
          newNodeData.push(element);
          newNodeData.push(...nodes);
        }
        else
        {
          if(index == 0) {
            nodes[nodes.length - 1].next = element.id
          }
          else { 
            newNodeData[newNodeData.length-1].next=nodes[0].id;
            nodes[nodes.length-1].next=element.id;
          }
          newNodeData.push(...nodes);
          newNodeData.push(element);
        }
      }
      else
      newNodeData.push(element);
      
    });
    console.log(newNodeData);
    setNodeData(newNodeData);
  }

  // create separate function to create inputData linked list
  const createNodeDataArray = (arr) => {
    const inputNodeData = [];

    for (let i = 0; i < arr.length; i++) {
      const row = Math.floor(i / NODES_PER_ROW);
      const col = i % NODES_PER_ROW;

      inputNodeData.push({
        id: Date.now() + i,
        x: col * (NODE_WIDTH + H_GAP),
        y: row * (NODE_HEIGHT + V_GAP),
        data: arr[i],
        next: i + 1 === arr.length ? null : Date.now() + i + 1,
      });
    }

    return inputNodeData;
  }

  return (
    <>
      <div className="inputDiv">
        <div className="btnDiv"
        style={{
            opacity:hasNodes?1:0.8,
            pointerEvents: hasNodes?'all':'none'
          }}>
          <button className="btn" onClick={handleAppend}>
            Append Node
          </button>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              className={error ? "error-field" : ""}
              placeholder={!error?"Enter val (space or comma seperated)":error}
              value={input}
              onChange={(e) => {setInput(e.target.value); setError("")}}
            />
            {input && (
              <button type="button" onClick={clearInput} className="clear-btn">
                X
              </button>
            )}
          </div>
          <button className="btn">Make Nodes</button>
          <div>
            <button className="btn" onClick={putData}>
              Load Test Data
            </button>
          </div>
          <div
          style={{
            opacity:hasNodes?1:0.8,
            pointerEvents: hasNodes?'all':'none'
          }}>
            <button type="button" className="btn" onClick={deleteNode}>
              Delete Node
            </button>
          </div>
          <BeforeAfterToggle />
        </form>
      </div>
    </>
  );
}

export default Input;