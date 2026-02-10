'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'default_legacy_hash' // Temporary default for existing users
    });

    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('admin', 'staff', 'customer'),
      allowNull: false,
      defaultValue: 'customer'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'role');
    await queryInterface.removeColumn('users', 'password');
  }
};
