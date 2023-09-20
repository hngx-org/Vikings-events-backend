'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('group_image', {

      comment_id: {
        type: Sequelize.UUID,
        references: {
          tableName: 'comments',
          key: 'id',
        },
      },
      image_id: {
        type: Sequelize.UUID,
        references: {
          tableName: 'images',
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
