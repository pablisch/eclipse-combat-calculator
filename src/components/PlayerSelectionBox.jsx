import PropTypes from 'prop-types';
import { attackers, defenders } from '../data/combatants';
import './PlayerSelectionBox.css';

const PlayerSelectionBox = ({
  allData,
  attackerIndex,
  defenderIndex,
  setAttackerIndex,
  setDefenderIndex,
  handleBattle,
  battleInProgress,
  percentage,
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

  // eslint-disable-next-line react/prop-types
  const attacker = allData[attackerIndex].player;
  // eslint-disable-next-line react/prop-types
  const defender = allData[defenderIndex].player;
  const report = percentage === null ? 'Choose your battle!' :
    percentage === 0 ? <><span>{attacker}</span> have pretty much <span>no chance</span> of winning against <span>{defender}</span></> :
    percentage === 100 ? (<><span>{attacker}</span> will <span>crush</span> the <span>{defender}</span>... unless they don't!</>) :
    (<><span>{attacker}</span> has a <span>{percentage}%</span> chance of defeating the <span>{defender}</span></>);

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
        <p id='report'>{report}</p>
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
  percentage: PropTypes.number,
};

export default PlayerSelectionBox;
