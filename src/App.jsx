import { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { playerShipData } from './data/playerData';
import PlayerSelectionBox from './components/PlayerSelectionBox';
import CombatantBox from './components/CombatantBox';
// eslint-disable-next-line no-unused-vars
import Ship from './classes/Ship';
import Battle from './classes/Battle';
import { getArmies } from '../src/util/battleFunctions';


function App() {
  const [allData, setAllData] = useState(playerShipData);
  const [battleInProgress, setBattleInProgress] = useState(false);
  const [battleCount, setBattleCount] = useState(false);
  // const [report, setReport] = useState(['Choose your battle!']);
  const [percentage, setPercentage] = useState(null);

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
    const armies = cloneDeep(initialArmies);
    const battle = new Battle(armies);

    if (battle.fight() === 'attacker') {
      battles.attacker++;
    } else {
      battles.defender++;
    }
  }

    console.log('Attacker:', Math.round(battles.attacker / (runs / 100)), 'vs. Defender:', Math.round(battles.defender / (runs / 100)));
    console.log('Attacker wins', battles.attacker, 'times.', (Math.round(battles.attacker / (runs / 10000))) / (runs / 1000), '%');
    console.log('Defender wins', battles.defender, 'times.', (Math.round(battles.defender / (runs / 10000))) / (runs / 1000), '%');

  setBattleInProgress(false);

  setPercentage(Math.round(battles.attacker / (runs / 100)));
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
          percentage={percentage}
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
