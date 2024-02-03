import { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { playerShipData } from '../src/data/playerShipData.js';
import PlayerSelectionBox from './components/PlayerSelectionBox';
import CombatantBox from './components/CombatantBox';
// eslint-disable-next-line no-unused-vars
import Ship from './classes/Ship';
import Battle from './classes/Battle';
import {getArmies} from '../src/util/battleFunctions';

function App() {
  const [allData, setAllData] = useState(playerShipData);
  const [battleInProgress, setBattleInProgress] = useState(false);
  const [battleCount, setBattleCount] = useState(false);
  const [report, setReport] = useState(['Choose your battle!']);

  const [attackerIndex, setAttackerIndex] = useState(3);
  const [defenderIndex, setDefenderIndex] = useState(0);

  useEffect(() => {
    if (battleCount > 0) {
      setTimeout(() => {
        startBattle();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleCount]);

  
  // let attacks = 0;
  // let allRolls = [];
  // let runs = 100000;

  const handleBattle = () => {
    setBattleInProgress(true);
    setBattleCount((count) => count + 1);
  };

  const startBattle = () => {
  let runs = 100000;
  const attacker = allData[attackerIndex].ships;
  const defender = allData[defenderIndex].ships;
  let initialArmies = [];

  getArmies(attacker, 'attacker', initialArmies);
  getArmies(defender, 'defender', initialArmies);

  console.log('Initial Armies: ', initialArmies);

  let battles = { attacker: 0, defender: 0 };

  for (let i = 0; i < runs; i++) {
    const armies = cloneDeep(initialArmies); // Clone the initial armies for each battle
    const battle = new Battle(armies);

    if (battle.fight() === 'attacker') {
      battles.attacker++;
    } else {
      battles.defender++;
    }
  }

  console.log('Attacker:', Math.round(battles.attacker / (runs / 100)), 'vs. Defender:', Math.round(battles.defender / (runs / 100)));

  setBattleInProgress(false);

  setReport([
    `${allData[attackerIndex].player} has a ${Math.round(battles.attacker / (runs / 100))}% chance of defeating the ${allData[defenderIndex].player}`,
  ]);
};


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
          battleInProgress={battleInProgress}
          report={report}
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
