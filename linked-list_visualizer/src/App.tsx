import './App.css'
import Node from './assets/components/Nodes'

function App() {
  const nodes = [
  { x: 200, y: 150, data: "Node A" },
  { x: 400, y: 300, data: "Node B" },
  { x: 400, y: 300, data: "Node B" }
];

  return (
    <>
    <Node {...nodes[2]}/>
    </>
  )
}

export default App
