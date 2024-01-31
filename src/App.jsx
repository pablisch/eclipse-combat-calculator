import { useEffect, useState } from 'react';
import { playerShipData } from './data/playerShipData';
import PlayerSelectionBox from './components/PlayerSelectionBox';
import CombatantBox from './components/CombatantBox';
import Ship from './classes/Ship';

function App() {
  const [allData, setAllData] = useState(playerShipData);
  const [armies, setArmies] = useState([[], []]);

  const [attackerIndex, setAttackerIndex] = useState(3);
  const [defenderIndex, setDefenderIndex] = useState(1);

  const handleBattle = () => {
    console.log('Battle!');

    const attacker = allData[attackerIndex].ships;
    const defender = allData[defenderIndex].ships;

    console.log('attacker: ', attacker);
    console.log('defender: ', defender);

    attacker.forEach((ship) => {
      for (let i = 0; i < ship.quantity; i++) {
        setArmies(prevArmies => [[...prevArmies[0], new Ship('attacker', ship.name, ship.initiative, ship.hulls, ship.computers, ship.shields, ship.cannons.ion, ship.cannons.plasma, ship.cannons.antimatter, ship.missiles)], [...prevArmies[1]]]);
      }
    });

    defender.forEach((ship) => {
      for (let i = 0; i < ship.quantity; i++) {
        setArmies(prevArmies => [[...prevArmies[0]], [...prevArmies[1], new Ship('defender', ship.name, ship.initiative, ship.hulls, ship.computers, ship.shields, ship.cannons.ion, ship.cannons.plasma, ship.cannons.antimatter, ship.missiles)]]);
      }
    });

  };

  useEffect(() => {
    console.log('armies: ', armies);
  }, [armies]);

  return (
    <div id='App'>
      <div id='attacker'>
        <CombatantBox setAllData={setAllData} allData={allData} playIndex={attackerIndex}>
          Attacker
        </CombatantBox>
      </div>
      <div id='switzerland'>
        <PlayerSelectionBox allData={allData} attackerIndex={attackerIndex} defenderIndex={defenderIndex} setAttackerIndex={setAttackerIndex} setDefenderIndex={setDefenderIndex} handleBattle={handleBattle} />
        
      </div>
      <div id='defender'>
        <CombatantBox setAllData={setAllData} allData={allData} playIndex={defenderIndex}>
          Defender
        </CombatantBox>
      </div>
    </div>
  );
}

export default App;
