import { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
// import { playerShipData } from '../src/data/playerShipData.js';
import PlayerSelectionBox from './components/PlayerSelectionBox';
import CombatantBox from './components/CombatantBox';
// eslint-disable-next-line no-unused-vars
import Ship from './classes/Ship';
import Battle from './classes/Battle';
import { getArmies } from '../src/util/battleFunctions';

const baseData = [
  {
    player: 'Ancients',
    ships: [
      {
        name: 'Ancient Ship',
        quantity: 1,
        initiative: 2,
        hulls: 2,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 2,
          plasma: 0,
          antimatter: 0,
        },
        power: 0,
        consumption: 0,
      },
    ],
  },
  {
    // player: 'Galactic Centre Defence System',
    player: 'GCDS',
    ships: [
      {
        name: 'GCDS',
        quantity: 1,
        initiative: 0,
        hulls: 8,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 4,
          plasma: 0,
          antimatter: 0,
        },
        power: 0,
        consumption: 0,
      },
    ],
  },
  {
    player: 'Eridani',
    ships: [
      {
        name: 'Interceptor',
        quantity: 0,
        initiative: 3,
        hulls: 1,
        computers: 0,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 3,
        consumption: 2,
      },
      {
        name: 'Cruiser',
        quantity: 0,
        initiative: 2,
        hulls: 2,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 3,
        consumption: 2,
      },
      {
        name: 'Dreadnought',
        quantity: 0,
        initiative: 1,
        hulls: 3,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 2,
          plasma: 0,
          antimatter: 0,
        },
        power: 4,
        consumption: 3,
      },
      {
        name: 'Starbase',
        quantity: 0,
        initiative: 4,
        hulls: 3,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 3,
        consumption: 1,
      },
    ],
  },
  {
    player: 'Orion',
    ships: [
      {
        name: 'Interceptor',
        initiative: 4,
        quantity: 0,
        hulls: 1,
        computers: 1,
        shields: 1,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 4,
        consumption: 2,
      },
      {
        name: 'Cruiser',
        quantity: 1,
        initiative: 3,
        hulls: 2,
        computers: 1,
        shields: 1,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 5,
        consumption: 2,
      },
      {
        name: 'Dreadnought',
        quantity: 0,
        initiative: 2,
        hulls: 3,
        computers: 1,
        shields: 1,
        missiles: 0,
        cannons: {
          ion: 2,
          plasma: 0,
          antimatter: 0,
        },
        power: 6,
        consumption: 3,
      },
      {
        name: 'Starbase',
        quantity: 0,
        initiative: 5,
        hulls: 3,
        computers: 1,
        shields: 1,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 3,
        consumption: 1,
      },
    ],
  },
  {
    player: 'Planta',
    ships: [
      {
        name: 'Interceptor',
        quantity: 0,
        initiative: 1,
        hulls: 1,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 5,
        consumption: 2,
      },
      {
        name: 'Cruiser',
        quantity: 0,
        initiative: 1,
        hulls: 2,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 5,
        consumption: 2,
      },
      {
        name: 'Dreadnought',
        quantity: 0,
        initiative: 1,
        hulls: 3,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 2,
          plasma: 0,
          antimatter: 0,
        },
        power: 5,
        consumption: 3,
      },
      {
        name: 'Starbase',
        quantity: 0,
        initiative: 2,
        hulls: 3,
        computers: 2,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 5,
        consumption: 1,
      },
    ],
  },
  {
    player: 'Draco',
    ships: [
      {
        name: 'Interceptor',
        quantity: 0,
        initiative: 3,
        hulls: 1,
        computers: 0,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 3,
        consumption: 2,
      },
      {
        name: 'Cruiser',
        quantity: 0,
        initiative: 2,
        hulls: 2,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 3,
        consumption: 2,
      },
      {
        name: 'Dreadnought',
        quantity: 0,
        initiative: 1,
        hulls: 3,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 2,
          plasma: 0,
          antimatter: 0,
        },
        power: 3,
        consumption: 3,
      },
      {
        name: 'Starbase',
        quantity: 0,
        initiative: 4,
        hulls: 3,
        computers: 1,
        shields: 0,
        missiles: 0,
        cannons: {
          ion: 1,
          plasma: 0,
          antimatter: 0,
        },
        power: 3,
        consumption: 1,
      },
    ],
  },
];

const playerShipData = [
  ...baseData,
  { ...baseData[2], player: 'Hydran' },
  { ...baseData[2], player: 'Mechanema' },
  { ...baseData[2], player: 'Terran' },
  { ...baseData[2], player: 'Terran Alliance' },
  { ...baseData[2], player: 'Terran Directorate' },
  { ...baseData[2], player: 'Terran federation' },
  { ...baseData[2], player: 'Terran Republic' },
  { ...baseData[2], player: 'Terran Union' },

];


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
