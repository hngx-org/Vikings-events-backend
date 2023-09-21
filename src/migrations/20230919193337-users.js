/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      avatar: {
        type: Sequelize.TEXT,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  },
};
