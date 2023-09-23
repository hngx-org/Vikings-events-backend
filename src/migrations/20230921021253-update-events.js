/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the new 'creator_id' column to the 'events' table
    await queryInterface.addColumn('events', 'creator_id', {
      type: Sequelize.UUID,
      allowNull: false, // The 'creator_id' cannot be null
      references: {
        model: 'users', // This column references the 'id' column in the 'user' table
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    //  remove the 'creator_id' column from the 'events' table
    // await queryInterface.removeColumn('events', 'creator_id');
  },
};
