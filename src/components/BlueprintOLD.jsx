import PropTypes from 'prop-types';
import ShipInputField from './ShipInputField';
import './Blueprint.css';

const Blueprint = ({ setAllData, allData, playIndex, shipIndex }) => {
  const playerName = allData[playIndex]?.player || '';
  const ship = allData[playIndex]?.ships[shipIndex] || '';
  // eslint-disable-next-line no-unused-vars
  const idPrefix = `${playIndex}-${shipIndex}`;

  const handleValueChange = (property, newValue) => {
    setAllData((prevAllData) => {
      return prevAllData.map((player) => {
        if (player.player === playerName) {
          return {
            ...player,
            ships: player.ships.map((currentShip) => {
              if (
                currentShip.name === allData[playIndex].ships[shipIndex].name
              ) {
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

  return (
    <div className='blueprint'>
      <form className='blueprint-form'>
        <ShipInputField
          id={`${ship}-initiative`}
          className={`form-field ship-name ${ship.quantity ? '' : 'none-name'}`}
          type={'number'}
          max={8}
          value={ship.quantity}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('quantity', Number(e.target.value))
          }>
          {ship.name !== 'GCDS' ? `${ship.name}s` : 'GCDS'}
        </ShipInputField>

        <ShipInputField
          id={`${ship.player}-initiative`}
          className={`form-field ${ship.quantity ? '' : 'none'}`}
          type={'number'}
          value={ship.initiative}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('initiative', Number(e.target.value))
          }>
          Initiative
        </ShipInputField>

        <ShipInputField
          id={`${ship.player}-hulls`}
          className={`form-field ${ship.quantity ? '' : 'none'}`}
          type={'number'}
          value={ship.hulls}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('hulls', Number(e.target.value))
          }>
          Hulls
        </ShipInputField>

        <ShipInputField
          id={`${ship.player}-computers`}
          className={`form-field ${ship.quantity ? '' : 'none'}`}
          type={'number'}
          value={ship.computers}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('computers', Number(e.target.value))
          }>
          Computers
        </ShipInputField>

        <ShipInputField
          id={`${ship.player}-shields`}
          className={`form-field ${ship.quantity ? '' : 'none'}`}
          type={'number'}
          value={ship.shields}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('shields', Number(e.target.value))
          }>
          Shields
        </ShipInputField>

        <ShipInputField
          id={`${ship.player}-ion-cannons`}
          className={`form-field ${ship.quantity ? '' : 'none'}`}
          type={'number'}
          value={ship.cannons?.ion}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('cannons.ion', Number(e.target.value))
          }>
          Ion Cannons
        </ShipInputField>

        <ShipInputField
          id={`${ship.player}-plasma-cannons`}
          className={`form-field ${ship.quantity ? '' : 'none'}`}
          type={'number'}
          value={ship.cannons?.plasma}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('cannons.plasma', Number(e.target.value))
          }>
          Plasma Cannons
        </ShipInputField>

        <ShipInputField
          id={`${ship.player}-anti-matter-cannons`}
          className={`form-field ${ship.quantity ? '' : 'none'}`}
          type={'number'}
          value={ship.cannons?.antimatter}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('cannons.antimatter', Number(e.target.value))
          }>
          Anti-matter Cannons
        </ShipInputField>

        <ShipInputField
          id={`${ship.player}-missiles`}
          className={`form-field ${ship.quantity ? '' : 'none'}`}
          type={'number'}
          value={ship.missiles}
          autoComplete='off'
          onChangeFunc={(e) =>
            handleValueChange('missiles', Number(e.target.value))
          }>
          Plasma Missile
        </ShipInputField>
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
