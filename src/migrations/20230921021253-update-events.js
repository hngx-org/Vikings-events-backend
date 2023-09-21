/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the new 'creator_id' column to the 'events' table
    await queryInterface.addColumn('events', 'creator_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // The 'creator_id' cannot be null
      references: {
        model: 'user', // This column references the 'id' column in the 'user' table
        key: 'id',
      },
      onUpdate: 'CASCADE', // If the 'id' in 'users' changes, update 'creator_id' in 'events'
      onDelete: 'CASCADE', // If a user is deleted, set 'creator_id' in 'events' to NULL
    });
  },

  async down(queryInterface, Sequelize) {
    //  remove the 'creator_id' column from the 'events' table
    // await queryInterface.removeColumn('events', 'creator_id');
  },
};
