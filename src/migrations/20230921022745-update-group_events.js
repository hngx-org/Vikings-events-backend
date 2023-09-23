module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('group_events', 'group_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'groups', // reference to the 'groups' table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Step 2: Remove the old 'event_id' column
    await queryInterface.removeColumn('group_events', 'event_id');
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
