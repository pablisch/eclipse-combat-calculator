import { useState } from 'react';
import { playerShipData } from './data/playerShipData';
import './App.css'
import Blueprint from './components/Blueprint';

function App() {
  const [shipData, setShipData] = useState(playerShipData)

  return (
    <>
      <Blueprint shipData={shipData} setShipData={setShipData} />
    </>
  )
}

export default App
