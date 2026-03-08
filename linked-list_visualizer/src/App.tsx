import './App.css'
import Node from './components/Nodes'

function App() {
  const nodes = [
  { x: 200, y: 150, data: "Node A" },
  { x: 400, y: 300, data: "Node B" },
  { x: 400, y: 100, data: "Node B" }
];

  return (
    <>
    <Node {...nodes[0]}/>
    <Node {...nodes[1]}/>
    <Node {...nodes[2]}/>
    </>
  )
}

export default App
