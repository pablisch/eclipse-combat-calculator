import PropTypes from 'prop-types';
import ShipInputField from './ShipInputField';
import './Blueprint.css';
import { inputFieldsProvider } from '../data/blueprintInputFields';

const Blueprint = ({ setAllData, allData, playIndex, shipIndex }) => {
  const playerName = allData[playIndex]?.player || '';
  const ship = allData[playIndex]?.ships[shipIndex] || '';

  const idPrefix = `${playIndex}-${shipIndex}`;

  const handleValueChange = (property, newValue) => {
    setAllData((prevAllData) => {
      return prevAllData.map((player) => {
        if (player.player === playerName) {
          return {
            ...player,
            ships: player.ships.map((currentShip) => {
              if (currentShip.name === allData[playIndex].ships[shipIndex].name) {
                if (property.includes('cannons')) {
                  return {
                    ...currentShip,
                    cannons: {
                      ...currentShip.cannons,
                      [property.split('.')[1]]: newValue,
                    },
                  };
                } else {
                  return { ...currentShip, [property]: newValue };
                }
              }
              return currentShip;
            }),
          };
        }
        return player;
      });
    });
  };

  const inputFields = inputFieldsProvider(ship, handleValueChange, idPrefix);

  return (
    <div className='blueprint'>
      <form className='blueprint-form'>
        {inputFields.map((field) => (
          <ShipInputField key={field.id} {...field}>
            {field.label}
          </ShipInputField>
        ))}
      </form>
    </div>
  );
};

Blueprint.propTypes = {
  setAllData: PropTypes.func.isRequired,
  allData: PropTypes.array,
  playIndex: PropTypes.number,
  shipIndex: PropTypes.number,
};

export default Blueprint;
