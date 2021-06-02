module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    nickname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    battle_id:{
      type: Sequelize.INTEGER
    },
    level:{
      type: Sequelize.BIGINT,
      defaultValue: 1
    },
    experience:{
      type: Sequelize.BIGINT,
      defaultValue: 0
    },
    health:{
      type: Sequelize.BIGINT,
      defaultValue: 1000
    },
    stats: {
      type: Sequelize.JSON,
      defaultValue: {
        strength: 1,
        agility: 2,
        intelligence: 2,
        attack: 100,
        armor: 3
      }
    },
    buffs: {
      type: Sequelize.JSON
    },
    debuffs: {
      type: Sequelize.JSON
    },
    equipment: {
      type: Sequelize.JSON,
      defaultValue: {
        weapon: {
          name: "Frozen Lance",
          level: 1,
          rarity: "Legendary",
          stats: {
            strength: 6,
            agility: 6,
            intelligence: 1
          },
          proc: {
            chance: 15,
            type: "ice",
            count: 1,
            min: 11,
            max: 22
          },
          animation: "animateSlash"
        }
      }
    }
  });

  return User;
};
