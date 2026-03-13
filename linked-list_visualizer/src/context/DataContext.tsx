import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type NodeData = {
  id: number;
  x: number;
  y: number;
  data: string;
  next: number | null;
};
type DataContextType = {
  nodeData: NodeData[];
  setNodeData: React.Dispatch<React.SetStateAction<NodeData[]>>;

  selNodeId: number | null;
  setSelNodeId: React.Dispatch<React.SetStateAction<number | null>>;
};
type ProviderProps = { children: ReactNode };

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: ProviderProps) {
  const [nodeData, setNodeData] = useState<NodeData[]>([]);
  const [selNodeId, setSelNodeId] = useState<number | null>(null);

  return (
    <DataContext.Provider
      value={{
        nodeData,
        setNodeData,
        selNodeId,
        setSelNodeId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default function useDataContext() {
  // return useContext(DataContext)
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used inside DataProvider");
  }
  return context;
}
