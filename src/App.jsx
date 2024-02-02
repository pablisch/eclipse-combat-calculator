import { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
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
  }, [battleCount])

  let armies = [];
  // let attacks = 0;
  let allRolls = [];
  let runs = 100000;

  const handleBattle = () => {
    setBattleInProgress(true);
    setBattleCount(count => count + 1);
  };

  const startBattle = () => {
    // console.log('Fight!')
    const attacker = allData[attackerIndex].ships;
    const defender = allData[defenderIndex].ships;

    getArmies(attacker, 'attacker', armies);
    getArmies(defender, 'defender', armies);
    armies = initiativeOrderSort(armies);

    const startingArmies = cloneDeep(armies);
    console.log('armies: ', armies)
    // console.log('startingArmies: ', startingArmies)
    

    let battles = {attacker: 0, defender: 0};
    for (let i = 0; i < runs; i++) {
      armies = cloneDeep(startingArmies);
      // console.log('armies: ', armies[0], armies[1]);
      // attacks = 0;
      while (enemiesRemaining(armies)) {
        const shooter = getNextAttacker(armies);
        const shots = fireCannons(shooter);
        // console.log('shots: ', shots);
        const targets = orderTargetsByPriority(armies, shooter.getRole());
        // console.log(enemiesRemaining(armies));
        assignDamage(targets, shooter, shots, armies, allRolls);
        // attacks++;
        if (!enemiesRemaining(armies)) {
          const winner = armies[0].role;
          // console.log(`${winner} won after ${attacks} attacks! ${allRolls}`);
          if (winner === 'attacker') {
            battles.attacker++;
          } else {
            battles.defender++;
          }
        }
      }
      
      armies = [];
      // attacks = 0;
      allRolls = [];
    }
    console.log('attacker:', Math.round(battles.attacker / (runs / 100)), 'defender:', Math.round(battles.defender / (runs / 100)), 'over', runs, 'battles.');
    setBattleInProgress(false);
    setReport([`${allData[attackerIndex].player}`, ' has a', `${Math.round(battles.attacker / (runs / 100))}%`, ' chance of defeating the', `${allData[defenderIndex].player}`]);
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
