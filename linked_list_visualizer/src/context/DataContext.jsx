import React, { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [nodeData, setNodeData] = useState([]);
  const [selNodeId, setSelNodeId] = useState(null);
  const [hasNodes, setHasNodes]=useState(false);

  return (
    <DataContext.Provider
      value={{
        nodeData,
        setNodeData,
        selNodeId,
        setSelNodeId,
        hasNodes,
        setHasNodes
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useDataContext must be used inside DataProvider");
  }

  return context;
}