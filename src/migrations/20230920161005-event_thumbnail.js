'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comment_images', {
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          tableName: 'events',
          key: 'id',
        },
      },
      image_id: {
        type: Sequelize.INTEGER,
        references: {
          tableName: 'images',
          key: 'id',
        },
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
