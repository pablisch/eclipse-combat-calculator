export default class Ship {
  constructor(
    role,
    name,
    initiative,
    hulls,
    computers,
    shields,
    ionCannons,
    plasmaCannons,
    antimatterCannons,
    missiles
  ) {
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
    this.missiles = missiles * 2;
    this.missileRounds = 0;
    this.rounds = 0;
    this.missileThreat = missiles * 2 * (computers + 1);
    this.cannonThreat =
      (ionCannons + (plasmaCannons * 2 || 0) + (antimatterCannons * 3 || 0)) *
        (computers + 1) +
      hulls;
    this.priority =
      this.name === 'Dreadnought'
        ? 1
        : this.name === 'Cruiser'
        ? 2
        : this.name === 'Starbase'
        ? 3
        : this.name === 'Interceptor'
        ? 4
        : 1;
  }

  getId() {
    return this.id;
  }

  fireCannons() {
    const cannons = ['ion', 'plasma', 'antimatter'];
    const shots = [];
    cannons.forEach((cannon) => {
      for (let i = 0; i < this[cannon + 'Cannons']; i++) {
        const shot = this.fireCannon(cannon);
        if (shot.value >= 6) shots.push(shot);
      }
    });
    return shots;
  }

  fireCannon(type) {
    const roll = this.rollDice();
    const damage = type === 'ion' ? 1 : type === 'plasma' ? 2 : type === 'antimatter' ? 4 : 0;
    return { value: roll + this.computers, damage, six: roll === 6 };
  }

  setRounds() {
    this.rounds += 1;
  }

  removeHulls(damage) {
    this.hulls -= damage;
  }

  calculateCannonThreat() {
    const cannons =
      this.ionCannons + this.plasmaCannons * 2 ||
      0 + this.antimatterCannons * 3 ||
      0;
    const computers = this.computers + 1;
    return cannons * computers + this.hulls;
  }

  calculateMissileThreat() {
    const computers = this.computers + 1;
    return this.missiles * 2 * computers;
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  getRolls(arm) {
    const throws = [];
    const numOfRolls =
      arm === 'ion'
        ? this.ionCannons
        : arm === 'plasma'
        ? this.plasmaCannons
        : arm === 'antimatter'
        ? this.antimatterCannons
        : arm === 'missile'
        ? this.missiles
        : 0;
    for (let i = 0; i < numOfRolls; i++) {
      throws.push(this.rollDice());
    }
    return throws;
  }
}

// const ship = new Ship('defender', 'Cruiser', 3, 2, 2, 0, 3, 2, 1, 3);
// role - name - initiative - hulls - computers - shields - ionCannons - plasmaCannons - antimatterCannons - missiles
// console.log(ship)
// console.log(ship.initiative);
// console.log(ship.calculateCannonThreat());
// console.log(ship.calculateMissileThreat());
// console.log(ship.getMissileRolls(1));
// console.log(ship.getMissileRolls(2));
// console.log(ship.getMissileRolls(3));
// console.log(ship.getMissileRolls(4));
// console.log(ship.fireCannons());

