'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      event_id: {
        type: Sequelize.UUID,
        references: {
          model: 'events',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
