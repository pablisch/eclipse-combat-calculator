export default class Ship {
  constructor(role, name, initiative, hulls, computers, shields, ionCannons, plasmaCannons, antimatterCannons, missiles) {
    this.role = role;
    this.name = name;
    this.initiative = this.role === 'defender' ? initiative + 0.5 : initiative;
    this.hulls = hulls;
    this.computers = computers;
    this.shields = shields;
    this.ionCannons = ionCannons;
    this.plasmaCannons = plasmaCannons;
    this.antimatterCannons = antimatterCannons;
    this.missiles = missiles;
  }

  getRole() {
    return this.role;
  }

  getInitiative() {
    return this.initiative;
  }

  getHulls() {
    return this.hulls;
  }

  getComputers() {
    return this.computers;
  }

  getShields() {
    return this.shields;
  }

  getMissiles() {
    return this.missiles * 2;
  }

  getIonCannons() {
    return this.ionCannons;
  }

  getPlasmaCannons() {
    return this.plasmaCannons;
  }

  getAntimatterCannons() {
    return this.antimatterCannons;
  }

  calculateCannonThreat() {
    const cannons = this.getIonCannons() + (this.getPlasmaCannons() * 2) || 0 + (this.getAntimatterCannons() * 3) || 0;
    const computers = this.getComputers() + 1;
    return cannons * computers + this.getHulls();
  }

  calculateMissileThreat() {
    const computers = this.getComputers() + 1;
    return this.getMissiles() * 2 * computers;
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  getMissileRolls(arm) {
    const throws = [];
    const numOfRolls = arm === 1 ? this.getIonCannons() : arm === 2 ? this.getPlasmaCannons() : arm === 3 ? this.getAntimatterCannons() : this.getMissiles();
    for (let i = 0; i < numOfRolls; i++) {
      throws.push(this.rollDice());
    }
    return throws;
  }
}

const ship = new Ship('defender', 'Cruiser', 3, 2, 1, 0, 1, 1, 0, 3);
console.log(ship)
console.log(ship.getInitiative());
console.log(ship.calculateCannonThreat());
console.log(ship.calculateMissileThreat());
console.log(ship.getMissileRolls(1));
console.log(ship.getMissileRolls(2));
console.log(ship.getMissileRolls(3));
console.log(ship.getMissileRolls(4));