const db = require("../models");
const battleQueue = db.battleQueue;
const Users = db.user;
const Op = db.Sequelize.Op;

function HP(health, strength){
    return health+(strength*20)
}
function armor(armor, agility){
    return armor+(agility*0.167)
}

function damage(damage){
    return damage;
}

function collectBattleInfo(req, player, enemy) { //send data to BattleQueues Mysql
    return {
        player_username: player.name,
            player_id: req.userId,
        player_HP_now: player.HP,
        player_HP_max: player.maxHP,
        player_MP: 1000,
        equipment: player.equipment,
        player_skills: 0,
        player_stats: {
            strength: player.stats.strength,
            agility: player.stats.agility,
            intelligence: player.stats.intelligence,
            attack: player.stats.attack,
            armor: player.stats.armor
    },
        enemy_username: "Enemy",
            enemy_id: 2,
        enemy_HP_now: enemy.HP,
        enemy_HP_max: enemy.maxHP,
        enemy_MP: 1000,
        enemy_skills: 0,
        enemy_stats: {
            strength: enemy.stats.strength,
            agility: enemy.stats.agility,
            intelligence: enemy.stats.intelligence,
            attack: enemy.stats.attack,
            armor: enemy.stats.armor
    },
        test: {
            test: 1,
                test2: 2
        }
    }
}

function generateStats(user){//send data to client & battleQueues
    return {
        name: user.nickname,
            level: user.level,
        experience: user.experience,
        HP: HP(user.health, user.stats.strength),
        maxHP: HP(user.health, user.stats.strength),
        stats: {
        strength: user.stats.strength,
            agility: user.stats.agility,
            intelligence: user.stats.intelligence,
            attack: user.stats.attack,
            armor: armor(user.stats.armor, user.stats.agility)//takes main armor from db users and takes agility points. armor+(agility*0.167)
    },
        buffs: user.buffs,
            debuffs: user.debuffs,
        equipment: user.equipment
    }
}
const NPC_enemy = { //NPC target enemy
    nickname: "Enemy",
    level: 1,
    experience: 0,
    health: 1000,
    stats: {
        strength: 38,
        agility: 10,
        intelligence: 15,
        attack: 90,
        armor: 10
    },
    buffs: "",
    debuffs: "",
    equipment: {
        weapon: {
            name: "Damascus Rapier",
            level: 1,
            rarity: "Legendary",
            stats: {
                strength: 3,
                agility: 5,
                intelligence: 5
            },
            proc: {
                chance: 15,
                type: "fire",
                count: 3,
                min: 3,
                max: 9
            },
            animation: "animateSlash"
        }
    }
}

loadBattle = (req, res) => {
    Users.findOne({
        raw: true,
        where: {
            id: req.userId
        }
    }).then(user => {
          global.player = generateStats(user);
    }).then(() => {
         global.enemy = generateStats(NPC_enemy);
        res.send(
            {
                player,
                enemy
            }

        );
    })


    battleQueue.findOne({
        raw: true,
        where: {
            player_id: req.userId
        }
    }).then(battle => {
        if(!battle){
            //send fresh battle info.
            battleQueue.create(collectBattleInfo(req, player, enemy))
        }else{
            //send battle info if exist in db
        }
    });
    // battleQueue.update(test, {
    //     where: { id: 99 }
    // })

  };

    function roll(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

  attack = (req, res) => {
      battleQueue.findOne({
          raw: true,
          where: {
              player_id: req.userId
          }
      }).then(battle => {
          let playerDealDamage = damage(battle.player_stats.attack);
          let enemyDealDamage = damage(battle.enemy_stats.attack);

          let enemy_HP_now = battle.enemy_HP_now - playerDealDamage;

          if (playerDealDamage >= battle.enemy_HP_now) {
              var player_HP_now = battle.player_HP_now, enemyDied = true;
              console.log("enemy died")
          } else {
              var player_HP_now = battle.player_HP_now - enemyDealDamage
          }

          if (enemyDealDamage >= battle.player_HP_now && enemyDied !== true) {
              var playerDied = true;
              console.log("player died")
          }

          console.log(player_HP_now + " " + enemy_HP_now)

          let HP = {
              player_HP_now: player_HP_now,
              enemy_HP_now: enemy_HP_now
          }
          battleQueue.update(HP, {
              where: {id: battle.id}
          }).then(
                  res.send({
                      player: {
                          damage: playerDealDamage,
                          dead: playerDied
                      },
                      enemy: {
                          damage: enemyDealDamage,
                          dead: enemyDied
                      }
                  })
          ).then(()=> {
              if (enemyDied === true || playerDied === true){
                  battleQueue.destroy({where: {id: battle.id}})//delete battle if someone dead. TODO: after destroy need  send data to log(maybe to depict via 'logs' in [REPORT] section)
              }
          })
          // if(enemyDied){
          //     battleQueue.destroy({
          //         where: {id: 3}
          //     })
          // }
          //how to update minus hp
      })
        //player & enemy need class file.  to calculate stats.
      //loadBattle will load full info and adding item bonuses. Here will calculates attack dmg.

  };




const battle = {
  loadBattle: loadBattle,
  attack: attack
};

module.exports = battle;