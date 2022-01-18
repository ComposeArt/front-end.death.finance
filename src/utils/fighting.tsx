import React from "react";
import _ from "lodash";
import {
  GiPerson,
  GiMountaintop,
  GiMoon,
  GiSun,
  GiTwirlyFlower,
  GiFire,
  GiShadowFollower,
  GiSandsOfTime,
  GiSnowflake1,
  GiWaterDrop,
  GiHeavyLightning,
  GiMightyForce,
  GiWhirlwind,
} from "react-icons/gi";

export const elementStrengths: any = {
  0: [], // non elemental
  1: [3], // earth
  2: [1], // fire
  3: [2], // water
  4: [1,6], // light
  5: [2,4], // time
  6: [3,5], // force
  7: [1,6,12], // moon
  8: [1,4,7], // flower
  9: [2,4,8], // shadow
  10: [2,5,9], // ice
  11: [3,5,10], // thunder
  12: [3,6,11], // wind
};

export const elements: any = {
  0: {
    name: 'non-elemental',
    icon: <GiPerson />,
  },
  1: {
    name: 'earth',
    icon: <GiMountaintop />,
  },
  2: {
    name: 'fire',
    icon: <GiFire />,
  },
  3: {
    name: 'water',
    icon: <GiWaterDrop />,
  },
  4: {
    name: 'light',
    icon: <GiSun />,
  },
  5: {
    name: 'time',
    icon: <GiSandsOfTime />,
  },
  6: {
    name: 'force',
    icon: <GiMightyForce />,
  },
  7: {
    name: 'moon',
    icon: <GiMoon />,
  },
  8: {
    name: 'flower',
    icon: <GiTwirlyFlower />,
  },
  9: {
    name: 'shadow',
    icon: <GiShadowFollower />,
  },
  10: {
    name: 'ice',
    icon: <GiSnowflake1 />,
  },
  11: {
    name: 'thunder',
    icon: <GiHeavyLightning />,
  },
  12: {
    name: 'wind',
    icon: <GiWhirlwind />,
  },
};

export const specialAttacks: any = {
  0: [
    'throws a one finger punch',
    'throws a haymaker',
    'karate chops',
    'launches a flying kick',
    'initiates a piledrive',
    'initiates a piledrive of death'
  ],
  1: [
    'throws a sand attack',
    'throws a boulder smash',
    'attacks with a blasting earthspike',
    'summons a sandstorm',
    'summons a terrifying earthquake',
    'summons a once in a century earthquake',
  ],
  2: [
    'attacks with a smack of ash',
    'summons a heatwave',
    'attacks with a flamethrower',
    'sets off a wildfire',
    'calls upon a meteor',
    'calls upon a world ending meteor',
  ],
  3: [
    'squirts a water gun',
    'creates a whirlpool',
    'brings forth a waterfall',
    'throws a mist strike',
    'summons a typhoon',
    'summons a city destroying typhoon',
  ],
  4: [
    'radiates with sunshine',
    'blinds with a blinding light',
    'fires a sunbeam',
    'throws a guiding bolt',
    'initiates a solar eclipse',
    'initiates a final solar eclipse',
  ],
  5: [
    'launches a dilated attack',
    'throws a double strike',
    'forces a self infliction',
    'forces a time lapse trip',
    'starts a multiversal destruction',
    'starts a cross-multiversal destruction',
  ],
  6: [
    'produces a sound blast',
    'launches a throwback attack',
    'initiates a gravity charge',
    'summons a planet fall',
    'starts a super nova',
    'starts a delta omega super nova',
  ],
  7: [
    'begins to wolf howl',
    'launches a nightlight attack',
    'attacks with a lunar blast',
    'summons a star fall',
    'calls upon a crashing aurora borealis',
    'calls upon a hellish aurora borealis',
  ],
  8: [
    'fires a bullet seed',
    'tosses some poison gas',
    'attacks with a toxic bite',
    'initiates a carbon breakdown',
    'calls upon a cloud of acid rain',
    'calls upon a never ending cloud of acid rain',
  ],
  9: [
    'weirdly starts licking',
    'is having a nightmare',
    'starts to eat dreams',
    'initiates requiem',
    'summons a lunar eclipse',
    'summons a titan lunar eclipse',
  ],
  10: [
    'throws a snowball',
    'fires a frost bullet',
    'creates a giant avalanche',
    'summons a blizzard',
    'initiates a quick ice age',
    'starts a forever ice age',
  ],
  11: [
    'sparks a static shock',
    'launches a zap attack',
    'throws a thunderbolt',
    'sets up a lightning trap',
    "turns on tesla's enigma",
    "runs over with a cybertruck of tesla's enigma",
  ],
  12: [
    'attacks with fury swipes',
    'launches a nimbus strike',
    'kicks up a whirlwind',
    'summons a tornado',
    'summons a hurricane',
    "summons a country ripping hurricane",
  ],
};

export const attacks: any = {
  0: [
    'throws a slap',
    'throws a punch',
    'launches a kick',
    'attacks with a headbutt',
  ],
  1: [
    'throws a mud slap',
    'throws a rock punch',
    'launches a hot iron kick',
    'attacks with a steel headbutt',
  ],
  2: [
    'throws a single ember slap',
    'throws a spark punch',
    'launches a flame kick',
    'attacks with a fire headbutt',
  ],
  3: [
    'throws a bubble slap',
    'throws a hydro punch',
    'launches a torrent kick',
    'attacks with a tsunami headbutt',
  ],
  4: [
    'throws a beam slap',
    'throws a sunshine punch',
    'launches a blinding kick',
    'attacks with a solar headbutt',
  ],
  5: [
    'throws a double slap',
    'throws a self punch',
    'launches repeated kicks',
    'attacks with a single infinite headbutt',
  ],
  6: [
    'throws a backhand slap',
    'throws a pulse punch',
    'launches a gravity kick',
    'attacks with a quantum headbutt',
  ],
  7: [
    'throws a crescent moon slap',
    'throws a full moon punch',
    'launches a new moon kick',
    'attacks with a titan headbutt',
  ],
  8: [
    'throws a seed slap',
    'throws a root punch',
    'launches a thorn kick',
    'attacks with a spore headbutt',
  ],
  9: [
    'throws a shadow slap',
    'throws a dark punch',
    'launches a secret kick',
    'attacks with a headless headbutt',
  ],
  10: [
    'throws a frost slap',
    'throws a quick ice punch',
    'launches a cryo kick',
    'attacks with a frozen headbutt'
  ],
  11: [
    'throws a jolt slap',
    'throws a thunder punch',
    'launches a lightning kick',
    'attacks with a flash headbutt',
  ],
  12: [
    'throws a windy slap',
    'throws a gust punch',
    'launches a whirlwind kick',
    'attacks with a breakneck headbutt',
  ],
};

export const matchReporter = ({
  match,
  fighter1,
  fighter2,
}: any) => {
  const bouts = match.slice(1, -1).match(/.{1,9}/g);
  const winner = match.slice(-1);

  const p1Stats = _.clone(fighter1);
  const p2Stats = _.clone(fighter2);

  const p1SpecialElementStrong = _.indexOf(elementStrengths[p1Stats.special_element], p2Stats.special_element) > -1;
  const p2SpecialElementStrong = _.indexOf(elementStrengths[p2Stats.special_element], p1Stats.special_element) > -1;

  const p1ElementStrong = _.indexOf(elementStrengths[p1Stats.element], p2Stats.element) > -1;
  const p2ElementStrong = _.indexOf(elementStrengths[p2Stats.element], p1Stats.element) > -1;

  if (p1SpecialElementStrong) {
    p1Stats.special_attack = Math.min(p1Stats.special_attack * 2, 15);
  }

  if (p2SpecialElementStrong) {
    p2Stats.special_attack = Math.min(p2Stats.special_attack * 2, 15);
  }

  if (p1ElementStrong) {
    p1Stats.attack = Math.min(p1Stats.attack * 2, 15);
  }

  if (p2ElementStrong) {
    p2Stats.attack = Math.min(p2Stats.attack * 2, 15);
  }

  const p1Name = `|${fighter1.collection}_#${_.truncate(fighter1.token_id, { length: 7 })}|`;
  const p2Name = `|${fighter2.collection}_#${_.truncate(fighter2.token_id, { length: 7 })}|`;

  const logs = [];

  for (const bout of bouts) {
    const turn = bout.substring(0, 1);
    const attack = parseInt(bout.substring(1, 5), 2);
    const counter_attack = parseInt(bout.substring(5, 9), 2);

    let log = '';
    let type;
    let damage;
    let didBreak = false;

    if (turn === '0') {
      log = `${p1Name} `;

      if (p2Stats.defense > 0) {
        const p1SpecialAttackName = specialAttacks[p1Stats.special_element][_.floor(attack / 3)];

        if (counter_attack > 0 && counter_attack >= attack) {
          log += `${p1SpecialAttackName} but ${p2Name} `;

          if (p1Stats.defense > 0 && counter_attack > attack) {
            p1Stats.defense -= counter_attack - attack;

            log += `knows this move and easily counters, dealing |${counter_attack - attack} damage| instead, `;
            damage = counter_attack - attack;
            type = 'counter';

            if (p1Stats.defense <= 0) {
              didBreak = true;
              log += `enough to break ${p1Name}'s defense!`;
            } else {
              log += `leaving ${p1Name} with |${p1Stats.defense} defense| remaining.`;
            }
          } else {
            type = 'dodge';
            log += `sees it coming and dodges out of the way!`;
          }
        } else {
          p2Stats.defense -= attack;

          if (attack === 0) {
            type = 'misses';
            log += `tries to launch a special attack, but completely misses!`
          } else {
            if (attack === p1Stats.special_attack) {
              type = 'special-critical';
              log += `${p1SpecialAttackName}, dazing ${p2Name} `;
            } else {
              type = 'special-attack';
              log += `${p1SpecialAttackName} `;
            }

            log += `dealing |${attack} damage|, `
            damage = attack;

            if (p2Stats.defense <= 0) {
              didBreak = true;
              log += `enough to break ${p2Name}'s defense!`;
            } else {
              log += `leaving ${p2Name} with |${p2Stats.defense} defense| remaining.`;
            }
          }
        }
      } else if (p2Stats.health > 0) {
        const p1AttackName = attacks[p1Stats.element][_.floor(attack / 5)];

        if (counter_attack > 0 && counter_attack >= attack) {
          log += `${p1AttackName} but ${p2Name} `;

          if (p2Stats.defense <= 0 && p1Stats.defense <= 0 && counter_attack > attack) {
            p1Stats.health -= counter_attack - attack;

            type = 'counter';
            log += `is prepared and counters, dealing |${counter_attack - attack} damage| instead, `;
            damage = counter_attack - attack;

            if (p1Stats.health <= 0) {
              didBreak = true;
              log += `enough to KO ${p1Name}!`;
            } else {
              log += `leaving ${p1Name} with |${p1Stats.health} health| remaining.`;
            }
          } else {
            type = 'dodge';
            log += `barely dodges out of the way!`;
          }
        } else {
          p2Stats.health -= attack;

          if (attack === 0) {
            type = 'misses';
            log += `tries to sneak in an attack, but completely misses!`
          } else {
            if (attack === p1Stats.attack) {
              type = 'critical';
              log += `${p1AttackName}, dazing ${p2Name} `;
            } else {
              type = 'attack';
              log += `${p1AttackName} `;
            }

            log += `dealing |${attack} damage|, `;
            damage = attack;

            if (p2Stats.health <= 0) {
              didBreak = true;
              log += `enough to KO ${p2Name}!`;
            } else {
              log += `leaving ${p2Name} with |${p2Stats.health} health| remaining.`;
            }
          }
        }
      }
    } else {
      log = `${p2Name} `;

      if (p1Stats.defense > 0) {
        const p2SpecialAttackName = specialAttacks[p2Stats.special_element][_.floor(attack / 3)];

        if (counter_attack > 0 && counter_attack >= attack) {
          log += `${p2SpecialAttackName} but ${p1Name} `;

          if (p2Stats.defense > 0 && counter_attack > attack) {
            p2Stats.defense -= counter_attack - attack;

            log += `expected this and easily counters, dealing |${counter_attack - attack} damage| instead, `;
            damage = counter_attack - attack;
            type = 'counter';

            if (p2Stats.defense <= 0) {
              didBreak = true;
              log += `enough to break ${p2Name} defense!`;
            } else {
              log += `leaving ${p2Name} with |${p2Stats.defense} defense| remaining.`;
            }

          } else {
            type = 'dodge';
            log += `sees it coming and dodges out of the way!`;
          }
        } else {
          p1Stats.defense -= attack;

          if (attack === 0) {
            type = 'misses';
            log += `tries to launch a special attack, but completely misses!`
          } else {
            if (attack === p2Stats.special_attack) {
              type = 'special-critical';
              log += `${p2SpecialAttackName}, dazing ${p1Name} `;
            } else {
              type = 'special-attack';
              log += `${p2SpecialAttackName} `;
            }

            log += `dealing |${attack} damage|, `;
            damage = attack;

            if (p1Stats.defense <= 0) {
              didBreak = true;
              log += `enough to break ${p1Name} defense!`;
            } else {
              log += `leaving ${p1Name} with |${p1Stats.defense} defense| remaining.`;
            }
          }
        }
      } else if (p1Stats.health > 0) {
        const p2AttackName = attacks[p2Stats.element][_.floor(attack / 5)];

        if (counter_attack > 0 && counter_attack >= attack) {
          log += `${p2AttackName} but ${p1Name} `;

          if (p1Stats.defense <= 0 && p2Stats.defense <= 0 && counter_attack > attack) {
            p2Stats.health -= counter_attack - attack;

            log += `is prepared and counters, dealing |${counter_attack - attack} damage| instead, `;
            damage = counter_attack - attack;
            type = 'counter';

            if (p2Stats.health <= 0) {
              didBreak = true;
              log += `enough to KO ${p2Name}!`;
            } else {
              log += `leaving ${p2Name} with |${p2Stats.health} health| remaining.`;
            }
          } else {
            type = 'dodge';
            log += `barely dodges out of the way!`;
          }
        } else {
          p1Stats.health -= attack;

          if (attack === 0) {
            type = 'misses';
            log += `tries to sneak in an attack, but completely misses!`
          } else {
            if (attack === p2Stats.attack) {
              type = 'critical';
              log += `${p2AttackName}, dazing ${p1Name} `;
            } else {
              type = 'attack';
              log += `${p2AttackName} `;
            }

            log += `dealing |${attack} damage|, `;
            damage = attack;

            if (p1Stats.health <= 0) {
              didBreak = true;
              log += `enough to KO ${p1Name}!`;
            } else {
              log += `leaving ${p1Name} with |${p1Stats.health} health| remaining.`;
            }
          }
        }
      }
    }

    logs.push({
      turn,
      type,
      didBreak,
      damage,
      log,
    });
  }

  let finalLog = '';

  if (logs.length === 10 && p1Stats.health > 0 && p2Stats.health > 0) {
    if (p1Stats.health > p2Stats.health) {
      finalLog = `After the official |10 bouts|, ${p1Name} is declared the winner with |${p1Stats.health} health| remaining versus ${p2Name}'s |${p2Stats.health} health|.`;
    } else if (p2Stats.health > p1Stats.health) {
      finalLog = `After the official |10 bouts|, ${p2Name} is declared the winner with |${p2Stats.health} health| remaining versus ${p1Name}'s |${p1Stats.health} health|.`;
    } else if (p2Stats.health === p1Stats.health) {
      if (winner === '0') {
        finalLog = `After the official |10 bouts| and with both fighters tied in their efforts, a final duel between them both resulted in ${p1Name} landing the final blow and declaring victory!`;
      } else {
        finalLog = `After the official |10 bouts| and with both fighters tied in their efforts, a final duel between them both resulted in ${p2Name} landing the final blow and declaring victory!`;
      }
    }
  } else {
    if (winner === '0') {
      finalLog = `After |${bouts.length} bouts|, the winner by KO is ${p1Name}!`;
    } else {
      finalLog = `After |${bouts.length} bouts|, the winner by KO is ${p2Name}!`;
    }
  }

  logs.push({
    winner,
    turn: winner,
    log: finalLog,
  });

  return logs;
};
