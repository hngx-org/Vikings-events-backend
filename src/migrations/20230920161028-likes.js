/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      comment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'comments',
          key: 'id',
        },
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
