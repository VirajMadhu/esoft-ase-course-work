/** @type {import('sequelize-cli').Migration} */

import bcrypt from "bcrypt";

export async function up(queryInterface, Sequelize) {
  const email = "admin@esoft.com";
  const password = "adminpassword";

  // Check if admin already exists
  const [existingUser] = await queryInterface.sequelize.query(
    `SELECT id FROM users WHERE email = :email LIMIT 1`,
    {
      replacements: { email },
      type: Sequelize.QueryTypes.SELECT,
    },
  );

  if (existingUser) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await queryInterface.bulkInsert(
    "users",
    [
      {
        email,
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("users", { email: "admin@esoft.com" }, {});
}
