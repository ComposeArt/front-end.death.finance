export const rules = `

## Registration
In order to participate in the fight club, users must register their NFTs from [**any of the collections supported by the fight club**](https://death.finance/season/0/collections). The collections supported by the fight club are subject to change, each subsequent season, based on input from the community.
&nbsp;
&nbsp;

## Fighters

&nbsp;
### Stats

Every fighter has six stats that they use to do battle with their enemy.
&nbsp;

| Name | Range | Purpose |
| ----------- | ----------- |  ----------- |
| Special Attack | 1-15 | Used to break opponent's defense. |
| Special Element | 0-12 | Multiplier applied to special attack. |
| Defense | 1-15 | Used to block special attacks and protect health. |
| Attack | 1-15 | Used to drain opponent's health. |
| Element | 0-12 | Multiplier applied to attack. |
| Health | 1-15 | Usd to protect the fighter from a KO. |

&nbsp;
### Elements

Fighters have two elements - those which are strong against opponent elements give fighters a boost.
&nbsp;

| Id | Element | Strengths | Weaknesses |
| ----------- | ----------- |  ----------- |  ----------- |
| 0 | None | - | - |
| 1 | Earth | Water | Fire, Light, Moon, Flower |
| 2 | Fire | Earth | Water, Time, Shadow, Ice |
| 3 | Water | Fire | Earth, Force, Thunder, Wind |
| 4 | Light | Earth, Force | Time, Flower, Shadow |
| 5 | Time | Fire, Light | Force, Ice, Thunder |
| 6 | Force | Water, Time | Light, Moon, Wind |
| 7 | Moon | Earth, Force, Wind | Flower |
| 8 | Flower | Earth, Light, Moon | Shadow |
| 9 | Shadow | Fire, Light, Flower | Ice |
| 10 | Ice | Fire, Time, Shadow | Thunder |
| 11 | Thunder | Water, Time, Ice | Wind |
| 12 | Wind | Water, Force, Thunder | Moon |

&nbsp;
### Stat Calculations
Fighter stats are deterministic and based on the rarity of their traits relative to their collection's traits.

    1. Each collection trait receives a score between 0001 - 9999 based on how many NFTs have that trait. The higher the value the rarer the trait.

    2. NFT traits are ordered from highest to lowest.

    3. These scores are used to extract each fighter’s stats.

       a. S-Attack: Rarest Trait (first two digits)

       b. Defense: Second Rarest Trait (first two digits)

       c. Attack: Third Rarest Trait (first two digits)

       d. Health: Rarest Trait (second two digits)

       e. S-Element: Second Rarest Trait (second two digits)

       f. Element: Third rarest Trait (second two digits)

&nbsp;
#### Example

Imagine an NFT with the following traits:

    1. Earmuffs (0.5%)

    2. Sunglasses (55.25%)

    3. Goatee (8.4%)

    4. Bowtie (70.4%)


&nbsp;
_Note: Each % is based on how many NFTs in the collection for this trait type have this specific trait._

&nbsp;
This would translate into the following rareness scores:

    1. Earmuffs - 9950

    2. Sunglasses - 4575

    3. Goatee - 9260

    4. Bowtie - 2960


&nbsp;
Which would give the NFT the following stats:

    1. Special Attack: 99 (first two digits of rarest trait)

    2. Defense: 92 (first two digits of second rarest trait)

    3. Attack: 45 (first two digits of third rarest trait)

    4. Health: 50 (second two digits of rarest trait)

    5. Special Element: 60 (second two digits of second rarest trait)

    6. Element: 75 (second two digits of third rarest trait)

&nbsp;
After being normalized within the stats value ranges, the final stats would be:

    1. S-Attack: 15

    2. Defense: 14

    3. Attack: 7

    4. Health: 8

    5. S-Element: 7

    6. Element: 9

&nbsp;
## Matches

Matches consist of a maximum of 10 bouts where the last fighter standing / fighter with the most health remaining is declared the winner.

    - Each bout is an attempt by either fighter to deplete their opponent's defense or health.

    - The fighter with the lowest aggregate value for their special attack, defense, attack, and health attacks first.

    - Fighters start off using their special attack to deplete their opponent's defense.
    - After an opponent's defense is depleted, fighters use their attack to deplete their opponent's health.

    - The amount of damage dealt by a fighter's special attack / attack is determined by a pseudorandom process that selects a number between 1 and that stat's value.

    - Elements / special elements can improve chances of doing more damage to opponents.

&nbsp;
_Note: The pseudorandom process mentioned above is driven by crowdsourced randomness variable stored on the fight club smart contract._

&nbsp;
### Counters

Counters allow fighters to dodge and potentially deal damage to the attacking fighter.

    When a fighter attacks using their special attack, it will either be:

    - Strengthened by their special element and deal between 1 and 2x their special attack's value (with a maximum of 15 damage).

    - Weakened by their special element and allow the opponent to counter with up to the same amount of damage as their max special attack.

&nbsp;
Consider the following bout:

    Fighter A has 15 Special Attack, 13 Defense, 15 Attack, 12 Health, Fire Special Element, No Element

    Fighter B has 15 Special Attack, 14 Defense, 14 Attack, 12 Health, Water Special Element, No Element

    If A attacks B with their Special Attack with a value of 13, B will roll a die from 1-14 in an attempt to counterattack A.

    - If B rolls below 13, they receive 13 damage and are now at 1 Defense.

    - If B rolls 13, they dodge the special attack and receive no damage.

    - If B rolls 14, they receive no damage, but instead deal 1 damage (14-13) to A's defense, leaving A with 12 defense.

&nbsp;
If A were to have no defense left in the previous scenario, then B would only have been able to dodge as **counters can only attack the same stat that they are countering**.
&nbsp;
_Note: The above applies in the same way for attack and health. As a result, elements can play a very important role in the outcome of games._

&nbsp;
### Critical Hits

When a fighter hits a random number which is at the top of their range for their stat (or 2x in the case that their special element / element is strong against the opponent's), they stun their opponent so that their opponent gets skipped and they get to take another turn.

&nbsp;
### Ties

In the case that after 10 bouts, both fighters are still standing, the one with more health left will be deemed the victor. So, if both fighters continuously dodged one-another for all 10 bouts, the one with the greater health stat would win by default.

&nbsp;
In the case that both fighters are standing and their leftover health is the same, the outcome will be determined by random coin flip.

&nbsp;
## Tournament

**The top 128 registered fighters will be drafted into an elimination tournament.**

&nbsp;
### Structure

&nbsp;
**Initial Brackets (Best of Three)**

The tournament will consist of 2 64-fighter 'initial brackets' (zeta & theta) which will each advance until there are 8 fighters left in each. Each pair within the bracket will play a best of three to decide who advances and who is eliminated.

&nbsp;
**Final Bracket (Best of Five)**

The 8 winners from each of the 'initial brackets' will advance to the 16-fighter 'final bracket' (sigma) which will yield the final two fighters for the tournament. Each pair within the bracket will play a best of five to decide who advances and who is eliminated.

&nbsp;
**Final Match (Best of Seven)**

The final pair will play best of seven to decide who wins the tournament; the winner will take home 5% of the total pooled ETH staked on fighters throughout the tournament's progression.

&nbsp;
### Schedule

Before the tournament kicks off, the power levels for all participating fighters as well as the block numbers at which all matches occur will be decided and locked into the on-chain smart contract with a provenance hash. The smart contract will also provide a verification function for individuals to independently verify the outcomes of all tournament matches.

&nbsp;
Every bracket will progress simultaneously with what are known as 'rounds' (e.g. going from 128 to 64 fighters). Between rounds, there will be a verification period where observers are allowed to challenge the results of any tournament fight for the previous round followed by a staking period (explained below).

&nbsp;
### Chaos

Every block with an even tens digit (e.g. 14194969), observers will be able to 'Add Chaos' to the smart contract to alter the outcome of subsequent fights. To ensure that there is no contention relating to when chaos was added and when a match occurred, we are barring matches from occurring on every block with an even tens digit. In this way, our source of randomness is locked in and past fights are able to be easily replayed and verified without worry of transaction ordering.

&nbsp;
_Note: Contributors to contract chaos will receive tiered rewards for their participation at the end of the tournament_

&nbsp;
### Banned Fighters

Fighters exhibiting exceptional power levels will be cited as doping and banned from participation in the tournament.
`;

const stakingRules = `

&nbsp;
### Staking

Throughout the tournament, observers will be able to stake ETH on fighters to earn yield on their outcomes; staking occurs at the beginning of brackets as well as between bracket rounds. Observers may only stake ETH for one fighter at a time.

*Note: By staking, users will automatically add chaos to the smart contract*
&nbsp;
**Multipliers**

When a user stakes ETH towards a fighter, they are issued a certain amount of equity against the total pool of ETH - this equity is directly proportional to their respective % of the pool. All users who have their fighters advance to the next round will have their equity doubled whilst those who have their fighters eliminated will see their equity drop to zero.

To give an example - a 0.01 ETH stake on the first round of the tournament (assuming the fighter advanced to the final round) would give a user the same amount of equity in the total pool as a 51.2 ETH (512x) stake on the final round. In this way, users are handsomely rewarded for being die-hard fans of certain fighters.
&nbsp;
**Fighter Elimination**

In the case that a fighter is eliminated, all equity which is held by observers staking towards that fighter drops to zero. At this point, the previously staked ETH is locked into the overall pool and each observer is free to stake new ETH towards a new fighter.
&nbsp;
**Redemption**

Those observers who staked towards the winning fighter will be able to redeem their yield after the final verification period. Their yield will be equivalent to their percentage of total equity of 95% of the pool - the remaining 5% will go to the owner of the winning NFT.
&nbsp;
### Emergency Withdrawal

In the case that the contract enters into some error state, an "emergencyWithdrawal" function has been included to allow users to redeem all previously staked ETH for the tournament in a single transaction; this inhibits ETH from being locked and indefinitely inaccessible.
&nbsp;
`;
