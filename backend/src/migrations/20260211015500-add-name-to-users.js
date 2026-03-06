/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "name", {
        type: Sequelize.STRING,
        allowNull: true,
        after: "id",
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "name");
}
