import React from "react";

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
  0: {
    3: 'one finger punch',
    6: 'haymaker',
    9: 'headbutt',
    12: 'flying kick',
    15: 'piledriver',
  },
  1: {
    3: 'sand attack',
    6: 'boulder smash',
    9: 'earthspike',
    12: 'sandstorm',
    15: 'earthquake',
  },
  2: {
    3: 'ash',
    6: 'heatwave',
    9: 'flamethrower',
    12: 'wildfire',
    15: 'meteor',
  },
  3: {
    3: 'watergun',
    6: 'whirlpool',
    9: 'waterfall',
    12: 'mist strike',
    15: 'typhoon',
  },
  4: {
    3: 'sunshine',
    6: 'blinding light',
    9: 'sunbeam',
    12: 'guiding bolt',
    15: 'solar eclipse',
  },
  5: {
    3: 'dilated attack',
    6: 'double strike',
    9: 'self infliction',
    12: 'infinite trip',
    15: 'multiversal destruction',
  },
  6: {
    3: 'sound blast',
    6: 'throwback attack',
    9: 'gravity charge',
    12: 'planet fall',
    15: 'super nova',
  },
  7: {
    3: 'wolf howl',
    6: 'nightlight attack',
    9: 'lunar blast',
    12: 'starfall',
    15: 'aurora borealis',
  },
  8: {
    3: 'bullet seed',
    6: 'poison gas',
    9: 'toxic bite',
    12: 'carbon breakdown',
    15: 'acid rain',
  },
  9: {
    3: 'lick',
    6: 'nightmare',
    9: 'dream eater',
    12: 'requiem',
    15: 'lunar eclipse',
  },
  10: {
    3: 'snowball toss',
    6: 'frost bullet',
    9: 'avalanche',
    12: 'blizzard',
    15: 'ice age',
  },
  11: {
    3: 'static shock',
    6: 'zap attack',
    9: 'thunderbolt',
    12: 'lightning trap',
    15: "tesla's enigma",
  },
  12: {
    3: 'fury swipes',
    6: 'nimbus strike',
    9: 'whirlwind',
    12: 'tornado',
    15: 'hurricane',
  },
};

export const attacks = {
  0: {
    5: 'slap',
    10: 'punch',
    15: 'kick',
  },
  1: {
    5: 'mud slap',
    10: 'rock punch',
    15: 'iron kick',
  },
  2: {
    5: 'ember slap',
    10: 'fire punch',
    15: 'flame kick',
  },
  3: {
    5: 'bubble slap',
    10: 'hydro punch',
    15: 'torrent kick',
  },
  4: {
    5: 'beam slap',
    10: 'sunshine punch',
    15: 'blinding kick',
  },
  5: {
    5: 'double slap',
    10: 'self punch',
    15: 'repeated kicks',
  },
  6: {
    5: 'backhand slap',
    10: 'pulse punch',
    15: 'gravity kick',
  },
  7: {
    5: 'crescent moon slap',
    10: 'full moon punch',
    15: 'new moon kick',
  },
  8: {
    5: 'seed slap',
    10: 'root punch',
    15: 'thorn kick',
  },
  9: {
    5: 'shadow slap',
    10: 'dark punch',
    15: 'secret kick',
  },
  10: {
    5: 'frost slap',
    10: 'ice punch',
    15: 'ice kick',
  },
  11: {
    5: 'jolt slap',
    10: 'thunder punch',
    15: 'lightning kick',
  },
  12: {
    5: 'windy slap',
    10: 'gust punch',
    15: 'whirlwind kick',
  },
};
