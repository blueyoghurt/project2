'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      facebookid: {
        type: Sequelize.STRING
      },
      facebooktoken: {
        type: Sequelize.STRING
      },
      googleid: {
        type: Sequelize.STRING
      },
      googletoken: {
        type: Sequelize.STRING
      },
      businessid: {
        type: Sequelize.INTEGER
      },
      facebook: {
        type: Sequelize.BOOLEAN
      },
      google: {
        type: Sequelize.BOOLEAN
      },
      method: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};