// eslint-disable-next-line no-unused-vars
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
    const lowestRoundsValue = Math.min(
      ...this.armies.map((ship) => ship.rounds)
    );
    return this.armies.filter((ship) => ship.rounds === lowestRoundsValue);
  }

  getNextShooters() {
    const stillToFireArray = this.getShipsWithLowestRoundsValue();
    const highestInitiative = Math.max(
      ...stillToFireArray.map((ship) => ship.initiative)
    );
    const shooters = stillToFireArray.filter(
      (ship) => ship.initiative === highestInitiative
    );
    this.targetRole = shooters[0].role === 'attacker' ? 'defender' : 'attacker';
    this.shooters = shooters;
    shooters.forEach((shooter) => shooter.setRounds());
  }

  getCannonRoundShots() {
    const shooters = this.shooters;
    const shots = shooters.map((shooter) => shooter.fireCannons());
    this.shots = shots.flat().sort((a, b) => b.damage - a.damage);
  }

  getTargets() {
    this.targets = this.armies
      .filter((ship) => ship.role === this.targetRole)
      .sort((a, b) => a.priority - b.priority);
  }

  sameShieldValue() {
    const shields = this.targets.map((ship) => ship.shields);
    return shields.every((val, i, arr) => val === arr[0]);
  }

  adjustShotsForEqualShieldValues() {
    if (this.sameShieldValue()) {
      // console.log(this.targets[0]);
      const adjustedShots = this.shots.filter(
        (shot) => shot.value - this.targets[0]?.shields >= 6 || shot.six
      );
      // console.log('shots:', this.shots, 'adjusted:', adjustedShots);
      this.shots = adjustedShots;
    }
  }

  assignCannonDamageToTargetWhenEqualShieldValues() {
    // console.log('shots:', this.shots);
    while (this.shots.length > 0 && this.targets.length > 0) {
      const target = this.targets[0];
      // console.log(' - target:', target.name, 'hulls:', target.hulls)
      const index1 = this.indexOfShotWithDamage(1);
      const index2 = this.indexOfShotWithDamage(2);
      if (target.hulls === 1 && index1 !== -1) {
        // console.log(`💥 Hit and destroyed ${target.name} with 1️⃣  damage`)
        this.shots.splice(index1, 1);
        this.destroyShip(target.id);
        this.targets.shift();
      } else if (target.hulls === 2 && index2 !== -1) {
        // console.log(`💥 Hit and destroyed ${target.name} with 2️⃣  damage`)
        this.shots.splice(index2, 1);
        this.destroyShip(target.id);
        this.targets.shift();
      } else {
        // console.log(`🚀 Hit ${target.name} with ${this.shots[0].damage} damage`)
        target.removeHulls(this.shots[0].damage);
        if (target.hulls <= 0) {
          // console.log(`... and destroyed ${target.name} 🤯`)
          this.destroyShip(target.id);
          this.targets.shift();
        }
        this.shots.shift();
      }
    }
    // console.log('shots:', this.shots, 'targets:', this.targets);
  }

  indexOfShotWithDamage(damageValue) {
    return this.shots.findIndex((shot) => shot.damage === damageValue);
  }

  destroyShip(id) {
    this.armies = this.armies.filter((ship) => ship.id !== id);
  }

    battleOver() {
      const uniqueRoles = [...new Set(this.armies.map((ship) => ship.role))];
      return uniqueRoles.length === 1;
  }
  
  findWinner() {
    return this.armies[0].role
  }

  fight() {
    while (!this.battleOver()) {
      // console.log('battle is over:', this.battleOver());
      this.getNextShooters();
      this.getCannonRoundShots();
      this.getTargets();
      this.adjustShotsForEqualShieldValues();
      this.assignCannonDamageToTargetWhenEqualShieldValues();
    }
    return this.findWinner();
  }
}

// const ship1 = new Ship('attacker', 'Cruiser', 3, 5, 4, 0, 0, 5, 0, 1);
// const ship2 = new Ship('attacker', 'Dreadnought', 3, 3, 0, 3, 0, 0, 5, 2);
// const ship5 = new Ship('attacker', 'Dreadnought', 3, 3, 0, 3, 0, 0, 5, 2);
// const ship3 = new Ship('defender', 'Cruiser', 3, 2, 2, 3, 7, 0, 0, 3);
// const ship4 = new Ship('defender', 'Dreadnought', 3, 1, 2, 3, 0, 5, 0, 2);
// // const battle = new Battle([ship1, ship2, ship3, ship4, ship5]);
// const battle = new Battle([ship4]);
// // // ship3.setRounds();
// // // ship1.setRounds();
// // ship4.setRounds();
// // // ship2.setRounds();
// battle.getNextShooters();
// battle.getCannonRoundShots();
// console.log(battle.shots);
// // console.log(battle.getTargets());
// battle.getTargets();
// battle.adjustShotsForEqualShieldValues();
// battle.assignCannonDamageToTargetWhenEqualShieldValues();

// console.log(battle.battleOver());
// console.log(battle.findWinner());
