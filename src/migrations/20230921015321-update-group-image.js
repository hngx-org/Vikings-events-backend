/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the existing 'comment_id' column
    await queryInterface.removeColumn('group_image', 'comment_id');

    // Add the new 'user_id' column
    await queryInterface.addColumn('group_image', 'group_id', {
      type: Sequelize.UUID,
      references: {
        model: 'groups',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // reverse changes (remove 'user_id' column)
    // await queryInterface.removeColumn('group_image', 'group_id')
  },
};
