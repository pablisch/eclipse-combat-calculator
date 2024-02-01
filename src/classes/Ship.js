export default class Ship {
  constructor(role, name, initiative, hulls, computers, shields, ionCannons, plasmaCannons, antimatterCannons, missiles) {
    this.id = Math.random();
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
    this.missileRounds = 0;
    this.rounds = 0;
    this.missileThreat = missiles * 2 * (computers + 1);
    this.cannonThreat = ((ionCannons + ((plasmaCannons * 2) || 0) + ((antimatterCannons * 3) || 0)) * (computers + 1)) + hulls;
    this.priority = this.name === 'Dreadnought' ? 1 : this.name === 'Cruiser' ? 2 : this.name === 'Starbase' ? 3 : this.name === 'Interceptor' ? 4 : 1;
  }

  getId() {
    return this.id;
  }

  getRounds() {
    return this.rounds;
  }

  setRounds() {
    this.rounds += 1;
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

  removeHulls(damage) {
    this.hulls -= damage;
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

  getRolls(arm) {
    const throws = [];
    const numOfRolls = arm === 'ion' ? this.getIonCannons() : arm === 'plasma' ? this.getPlasmaCannons() : arm === 'antimatter' ? this.getAntimatterCannons() : arm === 'missile' ? this.getMissiles() : 0;
    for (let i = 0; i < numOfRolls; i++) {
      throws.push(this.rollDice());
    }
    return throws;
  }
}

// const ship = new Ship('defender', 'Cruiser', 3, 2, 1, 0, 1, 1, 0, 3);
// console.log(ship)
// console.log(ship.getInitiative());
// console.log(ship.calculateCannonThreat());
// console.log(ship.calculateMissileThreat());
// console.log(ship.getMissileRolls(1));
// console.log(ship.getMissileRolls(2));
// console.log(ship.getMissileRolls(3));
// console.log(ship.getMissileRolls(4));