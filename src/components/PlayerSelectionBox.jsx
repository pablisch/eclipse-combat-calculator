import PropTypes from 'prop-types';
import { attackers, defenders } from '../data/combatants';
import './PlayerSelectionBox.css';

const PlayerSelectionBox = ({
  attackerIndex,
  defenderIndex,
  setAttackerIndex,
  setDefenderIndex,
  handleBattle,
}) => {
  
  const handleSelectAttacker = (e) => {
    // console.log('e.target.value: ', e.target.value)
    setAttackerIndex(Number(e.target.value) + 2);
  };
  
  const handleSelectDefender = (e) => {
    // console.log('e.target.value: ', e.target.value)
    setDefenderIndex(Number(e.target.value));
    // console.log('defenderIndex: ', defenderIndex)
  };

  // console.log('attacker:', attacker.player, ', and defender:', defender.player);

  return (
    <div className='player-selection-box'>
      
      <div id='attacker-selector-box' className='combatant-select-box'>
        <label htmlFor='selectAttacker'>Attacker:</label>
        <select
          id='selectAttacker'
          value={attackerIndex - 2}
          onChange={handleSelectAttacker}>
          {attackers.map((attacker, index) => (
            <option key={attacker} value={index}>
              {attacker}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleBattle}>Commence battle</button>

      <div id='defender-selector-box' className='combatant-select-box'>
        <label htmlFor='selectDefender'>Defender:</label>
        <select
          id='selectDefender'
          value={defenderIndex}
          onChange={handleSelectDefender}>
          {defenders.map((defender, index) => (
            <option key={defender} value={index}>
              {defender}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

PlayerSelectionBox.propTypes = {
  attackerIndex: PropTypes.number.isRequired,
  setAttackerIndex: PropTypes.func.isRequired,
  defenderIndex: PropTypes.number.isRequired,
  setDefenderIndex: PropTypes.func.isRequired,
  handleBattle: PropTypes.func.isRequired,
};

export default PlayerSelectionBox;
