import { useState } from 'react';
import { playerShipData } from './data/playerShipData';
import PlayerSelectionBox from './components/PlayerSelectionBox';
import CombatantBox from './components/CombatantBox';
// eslint-disable-next-line no-unused-vars
import Ship from './classes/Ship';
import {
  getArmies,
  initiativeOrderSort,
  getNextAttacker,
  fireCannons,
  orderTargetsByPriority,
  assignDamage,
  enemiesRemaining,
} from '../src/util/battleFunctions';

function App() {
  const [allData, setAllData] = useState(playerShipData);

  const [attackerIndex, setAttackerIndex] = useState(3);
  const [defenderIndex, setDefenderIndex] = useState(6);

  
  let armies = [];
  let attacks = 0;
  let allRolls = [];

  const handleBattle = () => {

    // console.log('Fight!')
    const attacker = allData[attackerIndex].ships;
    const defender = allData[defenderIndex].ships;

    getArmies(attacker, 'attacker', armies);
    getArmies(defender, 'defender', armies);
    armies = initiativeOrderSort(armies);

    const startingArmies = deepClone(armies);
    console.log('armies: ', armies)
    console.log('startingArmies: ', startingArmies)
    

    let battles = {attacker: 0, defender: 0};
    for (let i = 0; i < 100; i++) {
      armies = deepClone(startingArmies);
      // console.log('armies: ', armies[0], armies[1]);
      attacks = 0;
      while (enemiesRemaining(armies)) {
        const shooter = getNextAttacker(armies);
        const shots = fireCannons(shooter);
        // console.log('shots: ', shots);
        const targets = orderTargetsByPriority(armies, shooter.getRole());
        // console.log(enemiesRemaining(armies));
        assignDamage(targets, shooter, shots, armies, allRolls);
        attacks++;
        if (!enemiesRemaining(armies)) {
          const winner = armies[0].role;
          console.log(`${winner} won after ${attacks} attacks! ${allRolls}`);
          if (winner === 'attacker') {
            battles.attacker++;
          } else {
            battles.defender++;
          }
        }
      }
      
      armies = [];
      attacks = 0;
      allRolls = [];
    }
    console.log('attacker:, ', battles.attacker, 'defender: ', battles.defender);
    console.log('startingArmies: ', startingArmies);
  };

  function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    if (obj instanceof Ship) {
      // Create a new Ship instance with the same properties
      const { id, role, name, initiative, hulls, computers, shields, ionCannons, plasmaCannons, antimatterCannons, missiles, missileRounds, rounds, missileThreat, cannonThreat, priority } = obj;
      return new Ship(role, name, initiative, hulls, computers, shields, ionCannons, plasmaCannons, antimatterCannons, missiles);
    }
  
    if (Array.isArray(obj)) {
      // Create a new array with deep-cloned elements
      return obj.map(deepClone);
    }
  
    // Create a new object with deep-cloned properties
    const newObj = {};
    for (const key in obj) {
      newObj[key] = deepClone(obj[key]);
    }
  
    return newObj;
  }
  
  

  return (
    <div id='App'>
      <div id='attacker'>
        <CombatantBox
          setAllData={setAllData}
          allData={allData}
          playIndex={attackerIndex}>
          Attacker
        </CombatantBox>
      </div>
      <div id='switzerland'>
        <PlayerSelectionBox
          allData={allData}
          attackerIndex={attackerIndex}
          defenderIndex={defenderIndex}
          setAttackerIndex={setAttackerIndex}
          setDefenderIndex={setDefenderIndex}
          handleBattle={handleBattle}
        />
      </div>
      <div id='defender'>
        <CombatantBox
          setAllData={setAllData}
          allData={allData}
          playIndex={defenderIndex}>
          Defender
        </CombatantBox>
      </div>
    </div>
  );
}

export default App;
