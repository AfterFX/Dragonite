
let damage_multiplier_base = 0.06;
let damage_multiplier_factor = 1;
let structure = 1;

let dmg = 179;

let enemy_current_health = 1000;
let enemy_armor = -24; //regular


let enemy_positive_armor = Math.abs(enemy_armor);
let damage_multiplier = 1-(damage_multiplier_base*enemy_armor)/(damage_multiplier_factor+damage_multiplier_base*enemy_positive_armor)

let EHP = (enemy_current_health/damage_multiplier)

let atk_dmg_deal = dmg*damage_multiplier*structure

console.log(
    "Damage_Manipulation: "+ Math.round(damage_multiplier*1000000)/1000000 + '\n' +
    "EHP: "+ Math.round(EHP*100)/100 + '\n' +
    "atk dmg deal: "+ atk_dmg_deal
)








//percent calculator. how calculate 25% chance. On the first attack, however, it only has an ~8.5% probability to bash. Each subsequent attack without a bash increases the probability by ~8.5%. So on the second attack, the chance is ~17%, on the third it is ~25.5%, etc. After a bash occurs, the probability resets to ~8.5% for the next attack. These probabilities average out so that, over a moderate period of time, Bash effect procs nearly 25% of the time.
//calculates min-max damage. example 55 damage. than damage min-max range is 4(51-59). only can item change max damage, like item with +20 damage(from 51-59 to 51-79). if agility item give 25 agility(from from 51-59 to 79-94)