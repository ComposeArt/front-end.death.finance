export const rules = `
### Fighters

#### Registration

In order to participate in the fight club, users must register their NFTs from any of the collections supported by the fight club (link). The collections supported by the fight club are subject to change, each subsequent season, based on input from the community.

### Stats

Each fighter has the following stats:

- S-Attack (1 - 15)
  - Needed to break the opponent's defense.
- Defense (1 - 15)
  - Needed to block special attacks and protect health.
- Attack (1 - 15)
  - Needed to finish the opponent's health.
- Health (1 - 15)
  - Needed to protect the fighter from a KO.
- S-Element (0 - 12)
  - Applied to special attacks and defense.
- Element (0 - 12)
  - Applied to attacks and health.

Elements have strengths and weaknesses:

0. non-elemental (not strong against any element)
1. earth (strong against water)
2. fire (strong against earth)
3. water (strong against fire)
4. light (strong against earth & force)
5. time (strong against fire & light)
6. force (strong against water & time)
7. moon (strong against earth, force & wind)
8. flower (strong against earth, light & moon)
9. shadow (strong against fire, light & flower)
10. ice (strong against fire, time & shadow)
11. thunder (strong against water, time & ice)
12. wind (strong against water, force & thunder)

Fighter stats are deterministic and based on the rarity of their traits relative to their collection’s traits:

1. Each collection trait receives a score between 0001 - 9999 based on how many NFTs have that trait. The higher the value the rarer the trait.
2. NFT traits are ordered from highest to lowest.
3. These scores are used to extract each fighter’s stats.
  a. S-Attack: Rarest Trait (first two digits)
  b. Defense: Second Rarest Trait (first two digits)
  c. Attack: Third Rarest Trait (first two digits)
  d. Health: Rarest Trait (second two digits)
  e. S-Element: Second Rarest Trait (second two digits)
  f. Element: Third rarest Trait (second two digits)

**Example**
Imagine an NFT with the following:
1. Earmuffs (0.5%)
2. Sunglasses (55.25%)
3. Goatee (8.4%)

Each % is based on how many NFTs in the collection for this trait type have this specific trait.

This would translate into the following rarenesses scores:
1. Earmuffs - 9950
2. Sunglasses - 4575
3. Goatee - 9260

These would, in turn, give the fighter the following stats:
1. S-Attack: 99 (first two digits of rarest trait)
2. Defense: 92 (first two digits of second rarest trait)
3. Attack: 45 (first two digits of third rarest trait)
4. Health: 50 (second two digits of rarest trait)
5. S-Element: 60 (second two digits of second rarest trait)
6. Element: 75 (second two digits of third rarest trait)

These would be normalized within the stats value ranges, and would translate to:
1. S-Attack: 15
2. Defense: 14
3. Attack: 7
4. Health: 8
5. S-Element: 7
6. Element: 9


## Fights

Fights consist of a maximum of 10 turns - each turn is an attempt by either fighter to deplete their opponent’s defense or health. The first fighter to take a turn is the one with the least value for their aggregate stats of s-attack, defense, attack, and health.

Fighters must start off using their s-attack to deplete their opponent’s defense. After their opponent’s defense is depleted, they will go on to use their attack to deplete their health.

The amount of damage dealt by a fighter’s s-attack / attack is determined by a pseudorandom process that selects a number between 1 and that stat’s value. This pseudorandom process is driven by crowdsourced randomness stored on the fight club smart contract.

### Counters

When a fighter attacks using their s-attack, it will either be strengthened by their s-element (if it is strong against the opponent’s s-element) or weakened by their s-element (if it is weak against the opponent’s s-element). In the case that it is strong, their s-attack damage will be between 1 and 2x their s-attack’s value (with a maximum of 15 damage). In the case that it is weak, their opponent will have a chance to counterattack with up to the same amount of damage as their max s-attack. Consider the following:

**Example**
Fighter A has 15 S-Attack, 13 Defense, 15 Attack, 12 Health, 1 S-Element, 0 Element
Fighter B has 15 S-Attack, 14 Defense, 15 Attack, 12 Health, 6 S-Element, 0 Element

If A attacks B with their S-Attack with a value of 13, B will roll a die from 1-15 in an attempt to counterattack A.
- If B rolls below 13, they receive 13 damage and are now at 1 Defense.
- If B rolls 13, they dodge the s-attack and receive no damage.
- If B rolls 15, they receive no damage, but instead deal 2 damage (15-13) to A’s defense, leaving A with 11 defense.

If A were to have no defense left in the previous scenario, then B would only have been able to dodge as counters can only attack the same stat that they are countering.

The same thing applies for attack and health; in this way, elements can play a very heavy role in the outcome of games.

### Critical Hits

When a fighter hits a random number which is at the top of their range for their stat (or 2x in the case that their s-element / element is strong against the opponent’s), they stun their opponent so that their opponent gets skipped and they get to take another turn.

### Ties

In the case that, after 10 bouts, both fighters are still standing, the one with more health left will be deemed the victor. So, if both fighters continuously dodged one-another for all 10 bouts, the one with the greater health stat would win by default.

In the case that both fighters are standing and their leftover health is the same, the outcome will be determined by random coinflip.
`;
