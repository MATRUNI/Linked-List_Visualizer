import './App.css'
import Canvas from './components/Canvas';
import Input from './components/Input';

function App() {
  const nodes = [
  { x: 200, y: 150, data: "Node A" },
  { x: 400, y: 300, data: "Node B" },
  { x: 400, y: 100, data: "Node B" }
];

  return (
    <div id='app-div'>
      <Canvas/>
      <Input />
    </div>
  )
}

export default App
