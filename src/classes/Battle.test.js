import Ship from './Ship';
import Battle from './Battle';
import { describe, expect, test, assert, isObject } from 'vitest';

describe('Battle', () => {
  describe('getShipsWithLowestRoundsValue', () => {
    test('should return an array of all Ships when new Battle', () => {
      const ship1 = new Ship('attacker', 'Cruiser', 3, 2, 2, 0, 3, 2, 1, 3);
      const ship2 = new Ship('attacker', 'Dreadnought', 2, 1, 2, 0, 2, 1, 0, 2);
      const ship3 = new Ship('defender', 'Cruiser', 3, 2, 2, 0, 3, 2, 1, 3);
      const ship4 = new Ship('defender', 'Dreadnought', 2, 1, 2, 0, 2, 1, 0, 2);
      const battle = new Battle([ship1, ship2, ship3, ship4]);
      expect(battle.getShipsWithLowestRoundsValue()).toEqual([ship1, ship2, ship3, ship4]);
    });
    
    test('should return an array of Ships with the lowest rounds value', () => {
      const ship1 = new Ship('attacker', 'Cruiser', 3, 2, 2, 0, 3, 2, 1, 3);
      const ship2 = new Ship('attacker', 'Dreadnought', 2, 1, 2, 0, 2, 1, 0, 2);
      const ship3 = new Ship('defender', 'Cruiser', 3, 2, 2, 0, 3, 2, 1, 3);
      const ship4 = new Ship('defender', 'Dreadnought', 2, 1, 2, 0, 2, 1, 0, 2);
      ship1.setRounds();
      ship3.setRounds();
      const battle = new Battle([ship1, ship2, ship3, ship4]);
      expect(battle.getShipsWithLowestRoundsValue()).toEqual([ship2, ship4]);
    });
  });

  describe('getNextShooters', () => {
    test('should return an array of Ships with highest intitiative when new Battle', () => {
      const ship1 = new Ship('attacker', 'Cruiser', 3, 2, 2, 0, 3, 2, 1, 3);
      const ship2 = new Ship('attacker', 'Dreadnought', 2, 1, 2, 0, 2, 1, 0, 2);
      const ship3 = new Ship('defender', 'Cruiser', 3, 2, 2, 0, 3, 2, 1, 3);
      const ship4 = new Ship('defender', 'Dreadnought', 2, 1, 2, 0, 2, 1, 0, 2);
      const battle = new Battle([ship1, ship2, ship3, ship4]);
      // Defender ships have an extra 0.5 added to their initiative
      expect(battle.getNextShooters()).toEqual([ship3]);
    });
    
    test('should return an array of Ships with highest inititiative where it also has the lowest rounds value', () => {
      const ship1 = new Ship('attacker', 'Cruiser', 8, 2, 2, 0, 3, 2, 1, 3);
      const ship2 = new Ship('attacker', 'Dreadnought', 3, 1, 2, 0, 2, 1, 0, 2);
      const ship3 = new Ship('defender', 'Cruiser', 3, 2, 2, 0, 3, 2, 1, 3);
      const ship4 = new Ship('defender', 'Dreadnought', 3, 1, 2, 0, 2, 1, 0, 2);
      ship1.setRounds();
      const battle = new Battle([ship1, ship2, ship3, ship4]);
      // Defender ships have an extra 0.5 added to their initiative
      expect(battle.getNextShooters()).toEqual([ship3, ship4]);
    });
  });

  describe('getCannonRoundShots', () => {
    test('getCannonRoundShots returns expected structure', () => {
      // ARRANGE
      const ship1 = new Ship('attacker', 'Cruiser', 3, 2, 6, 0, 0, 0, 5, 3);
      const ship2 = new Ship('attacker', 'Dreadnought', 3, 1, 6, 0, 0, 5, 0, 2);
      const ship3 = new Ship('defender', 'Cruiser', 3, 2, 6, 0, 5, 0, 0, 3);
      const ship4 = new Ship('defender', 'Dreadnought', 3, 1, 2, 0, 0, 0, 0, 2);
      const battle = new Battle([ship1, ship2, ship3, ship4]);
  
      // ACT
      ship3.setRounds();
      ship4.setRounds();
      const shots = battle.getCannonRoundShots();
      
      // ASSERT
      assert(Array.isArray(shots));

        shots.forEach(shot => {
          assert(typeof shot === 'object' && shot !== null);
          assert('value' in shot);
          assert('damage' in shot);
          assert('six' in shot);
        });
    });
  });
});
