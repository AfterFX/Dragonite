module.exports = (sequelize, Sequelize) => {
    const battleQueue = sequelize.define("battleQueue", {
        player_username: {
            type: Sequelize.STRING
        },
        player_id: {
            type: Sequelize.INTEGER
        },
        player_HP_now: {
            type: Sequelize.INTEGER
        },
        player_HP_max: {
            type: Sequelize.INTEGER
        },
        player_MP: {
            type: Sequelize.INTEGER
        },
        equipment: {
            type: Sequelize.JSON,
            defaultValue: 0
        },
        player_skills: {
            type: Sequelize.STRING
        },
        player_stats: {
            type: Sequelize.JSON,
            defaultValue: 0,
        },
        enemy_username: {
            type: Sequelize.STRING
        },
        enemy_id: {
            type: Sequelize.INTEGER
        },
        enemy_HP_now: {
            type: Sequelize.INTEGER
        },
        enemy_HP_max: {
            type: Sequelize.INTEGER
        },
        enemy_MP: {
            type: Sequelize.INTEGER
        },
        enemy_skills: {
            type: Sequelize.STRING
        },
        enemy_stats: {
            type: Sequelize.JSON,
            defaultValue: 0,
        },
        test: {
            type: Sequelize.JSON
        }
    });

    return battleQueue;
};
