import Ship from '../classes/Ship.js';

export const getArmies = (player, role, armies) => {
  player.forEach((ship) => {
    for (let i = 0; i < ship.quantity; i++) {
      armies.push(
        new Ship(
          role,
          ship.name,
          ship.initiative,
          ship.hulls,
          ship.computers,
          ship.shields,
          ship.cannons.ion,
          ship.cannons.plasma,
          ship.cannons.antimatter,
          ship.missiles
        )
      );
    }
  });
};

export const initiativeOrderSort = (arrayOfShipObjects) => {
  return arrayOfShipObjects.sort((a, b) => b.initiative - a.initiative);
};

export const getNextAttacker = (armiesArray) => {
  // Find the Ship with the lowest 'rounds' value
  const shipWithLowestRoundsValue = armiesArray.reduce(
    (prevShip, currentShip) => {
      return currentShip.rounds < prevShip.rounds ? currentShip : prevShip;
    },
    armiesArray[0]
  );

  // console.log('next attacker', shipWithLowestRoundsValue);
  return shipWithLowestRoundsValue;
};

export const fireCannons = (shooter) => {
  const ionRolls = shooter.getRolls('ion');
  const plasmaRolls = shooter.getRolls('plasma');
  const antimatterRolls = shooter.getRolls('antimatter');
  // console.log(ionRolls, plasmaRolls, antimatterRolls);
  shooter.setRounds();
  return {
    ionRolls,
    plasmaRolls,
    antimatterRolls,
  };
};

export const orderTargetsByPriority = (armiesArray, shooterRole) => {
  // extract all target ships and order them by priority value
  const targetShips = armiesArray.filter((ship) => ship.role !== shooterRole);
  // console.log(targetShips);
  return targetShips.sort((a, b) => b.priority - a.priority);
};

export const assignDamage = (
  targets,
  shooter,
  shots,
  armiesArray,
  allRolls
) => {
  const computers = shooter.computers;
  for (let i = 0; i < shots.antimatterRolls.length; i++) {
    // console.log('anti:', shots.antimatterRolls[i], 'comp +', computers, 'shields -', targets[0]?.shields || null, 'result:', shots.antimatterRolls[i] + computers - targets[0]?.shields);
    if (
      targets.length &&
      shots.antimatterRolls[i] !== 1 &&
      (shots.antimatterRolls[i] + computers - targets[0].shields >= 6 ||
        shots.antimatterRolls[i] === 6)
    ) {
      // console.log('hit');
      targets[0].removeHulls(4);
      if (targets[0].hulls <= 0) {
        removeShip(targets[0], armiesArray);
        targets.shift();
        // console.log(`Destroyed! ${targets.length} ship${targets.length > 1 ? 's' : ''} left`);
      }
    }
  }
  for (let i = 0; i < shots.plasmaRolls.length; i++) {
    // console.log('plasma:', shots.plasmaRolls[i], 'comp +', computers, 'shields -', targets[0]?.shields || null, 'result:', shots.plasmaRolls[i] + computers - targets[0]?.shields);
    if (
      targets.length &&
      shots.plasmaRolls[i] !== 1 &&
      (shots.plasmaRolls[i] + computers - targets[0].shields >= 6 ||
        shots.plasmaRolls[i] === 6)
    ) {
      // console.log('hit');
      targets[0].removeHulls(2);
      if (targets[0].hulls <= 0) {
        removeShip(targets[0], armiesArray);
        targets.shift();
        // console.log(`Destroyed! ${targets.length} ship${targets.length > 1 ? 's' : ''} left`);
      }
    }
  }
  for (let i = 0; i < shots.ionRolls.length; i++) {
    allRolls.push(shots.ionRolls[i]);
    // console.log('ion:', shots.ionRolls[i], 'comp +', computers, 'shields -', targets[0]?.shields || null, 'result:', shots.ionRolls[i] + computers - targets[0]?.shields);
    if (
      targets.length &&
      shots.ionRolls[i] !== 1 &&
      (shots.ionRolls[i] + computers - targets[0].shields >= 6 ||
        shots.ionRolls[i] === 6)
    ) {
      // console.log('hit');
      targets[0].removeHulls(1);
      if (targets[0].hulls <= 0) {
        removeShip(targets[0], armiesArray);
        targets.shift();
        // console.log(`Destroyed! ${targets.length} ship${targets.length > 1 ? 's' : ''} left`);
      }
    }
  }
};

export const enemiesRemaining = (armiesArray) => {
  const defenders = armiesArray.filter((ship) => ship.role !== 'defender');
  const attackers = armiesArray.filter((ship) => ship.role !== 'attacker');
  // console.log(defenders, attackers)
  return defenders.length > 0 && attackers.length > 0;
};

const removeShip = (ship, armiesArray) => {
  const index = armiesArray.indexOf(ship);
  if (index > -1) {
    armiesArray.splice(index, 1);
  }
};
