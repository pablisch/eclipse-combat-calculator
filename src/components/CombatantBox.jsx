import PropTypes from 'prop-types';
// import Blueprint from './Blueprint';
import Blueprint from './Blueprint';
import './CombatantBox.css';

const CombatantBox = ({
  children,
  setAllData,
  allData,
  playIndex,
}) => {

  return (
    <div className='combatant-box'>
      <div className='role-and-name'>
        <h3 className='player-role'>{`${children}: `}</h3>
        <h2 className='player-name'>{allData[playIndex].player}</h2>
      </div>
      <div
        className={
          allData[playIndex].ships.length > 1
            ? 'ship-box'
            : 'ship-box single-ship'
        }>
        {allData[playIndex].ships.map((ship, index) => (
          <Blueprint
            key={`${playIndex}-${index}`}
            setAllData={setAllData}
            allData={allData}
            shipIndex={index}
            playIndex={playIndex}
          />
        ))}
      </div>
    </div>
  );
};

CombatantBox.propTypes = {
  children: PropTypes.string.isRequired,
  setAllData: PropTypes.func.isRequired,
  allData: PropTypes.array,
  playIndex: PropTypes.number.isRequired,
};

export default CombatantBox;
