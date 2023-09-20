'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      user_id: {
        type: Sequelize.UUID,
        references: {
          tableName: 'user',
          key: 'id',
        },
      },
      comment_id: {
        type: Sequelize.UUID,
        references: {
          tableName: 'comments',
          key: 'id',
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
