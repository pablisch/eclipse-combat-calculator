import Ship from './Ship.js';

export default class Battle {
  constructor(armies) {
    this.rounds = 0;
    this.armies = armies;
    this.target = 'attacker';
  }

  getShipsWithLowestRoundsValue() {
    const lowestRoundsValue = Math.min(...this.armies.map((ship) => ship.rounds));
    return this.armies.filter((ship) => ship.rounds === lowestRoundsValue);
  }

  getNextShooters() {
    const stillToFireArray = this.getShipsWithLowestRoundsValue();
    const highestInitiative = Math.max(...stillToFireArray.map((ship) => ship.initiative));
    const shooters = stillToFireArray.filter((ship) => ship.initiative === highestInitiative);
    this.target = shooters[0].role === 'attacker' ? 'defender' : 'attacker';
    console.log(this.target);
    return shooters;
  }

  getCannonRoundShots() {
    const shooters = this.getNextShooters();
    const shots = shooters.map((shooter) => shooter.fireCannons());
    return shots.flat();
  }

  getTargets() {
    return this.armies.filter((ship) => ship.role === this.target);
  }


}

const ship1 = new Ship('attacker', 'Cruiser', 3, 2, 6, 0, 0, 0, 5, 3);
const ship2 = new Ship('attacker', 'Dreadnought', 3, 1, 6, 0, 0, 5, 0, 2);
const ship3 = new Ship('defender', 'Cruiser', 3, 2, 6, 0, 5, 0, 0, 3);
const ship4 = new Ship('defender', 'Dreadnought', 3, 1, 2, 0, 0, 0, 0, 2);
const battle = new Battle([ship1, ship2, ship3, ship4]);
ship3.setRounds();
// ship1.setRounds();
ship4.setRounds();
// ship2.setRounds();
console.log(battle.getCannonRoundShots());
console.log(battle.getTargets());
