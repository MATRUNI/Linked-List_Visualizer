import { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
import Input from './components/Input'
function App() {

  return (
    <div id='app-div'>
      <Canvas/>
      <Input />
    </div>
  )
}

export default App
