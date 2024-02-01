import PropTypes from 'prop-types';
import { attackers, defenders } from '../data/combatants';
import './PlayerSelectionBox.css';

const PlayerSelectionBox = ({
  attackerIndex,
  defenderIndex,
  setAttackerIndex,
  setDefenderIndex,
  handleBattle,
  battleInProgress,
  report,
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
      <div className="button-and-report">

        <button onClick={handleBattle} disabled={battleInProgress} className={battleInProgress ? 'calculating' : ''}>{battleInProgress ? 'Calculating...' : 'Commence battle'}</button>
        {report.length === 1 ? <p id='report'>{report[0]}</p> : <p id='report'>
          <span>{ report[0]}</span>{report[1] } <span>{report[2] }</span>{report[3] } <span>{ report[4]}</span>
        </p>}
      </div>

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
  battleInProgress: PropTypes.bool.isRequired,
  report: PropTypes.array.isRequired,
};

export default PlayerSelectionBox;
