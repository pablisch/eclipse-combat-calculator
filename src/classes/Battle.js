import Ship from './Ship.js';

export default class Battle {
  constructor(armies) {
    this.rounds = 0;
    this.armies = armies;
    this.shooters = [];
    this.targets = [];
    this.targetRole = 'attacker';
    this.shots = [];
  }

  getShipsWithLowestRoundsValue() {
    const lowestRoundsValue = Math.min(...this.armies.map((ship) => ship.rounds));
    return this.armies.filter((ship) => ship.rounds === lowestRoundsValue);
  }

  getNextShooters() {
    const stillToFireArray = this.getShipsWithLowestRoundsValue();
    const highestInitiative = Math.max(...stillToFireArray.map((ship) => ship.initiative));
    const shooters = stillToFireArray.filter((ship) => ship.initiative === highestInitiative);
    this.targetRole = shooters[0].role === 'attacker' ? 'defender' : 'attacker';
    this.shooters = shooters;
  }

  getCannonRoundShots() {
    const shooters = this.shooters;
    const shots = shooters.map((shooter) => shooter.fireCannons());
    this.shots = shots.flat();
  }

  getTargets() {
    this.targets = this.armies.filter((ship) => ship.role === this.targetRole).sort((a, b) => a.priority - b.priority);
  }

  sameShieldValue() {
    const shields = this.targets.map((ship) => ship.shields);
    return shields.every((val, i, arr) => val === arr[0]);
  }

  adjustShotsForEqualShieldValues() {
    if (this.sameShieldValue()) {
      // console.log(this.targets[0]);
      const adjustedShots = this.shots.filter((shot) => shot.value - this.targets[0].shields >= 6 || shot.six);
      // console.log('shots:', this.shots, 'adjusted:', adjustedShots);
      this.shots = adjustedShots;
    }
  }

  assignDamageWhenEqualShieldValues() {
    while (this.shots.length > 0 && this.targets.length > 0) {
      if (this.targets.length > 1) { console.log('true');}
    }
  }





}

const ship1 = new Ship('attacker', 'Cruiser', 3, 2, 4, 3, 0, 0, 5, 3);
const ship2 = new Ship('attacker', 'Dreadnought', 3, 1, 1, 3, 0, 5, 0, 2);
const ship3 = new Ship('defender', 'Cruiser', 3, 2, 2, 3, 5, 0, 0, 3);
const ship4 = new Ship('defender', 'Dreadnought', 3, 1, 1, 3, 0, 0, 0, 2);
const battle = new Battle([ship1, ship2, ship3, ship4]);
ship3.setRounds();
// ship1.setRounds();
ship4.setRounds();
// ship2.setRounds();
battle.getNextShooters();
battle.getCannonRoundShots();
// console.log(battle.shots);
// console.log(battle.getTargets());
battle.getTargets();
battle.adjustShotsForEqualShieldValues();
