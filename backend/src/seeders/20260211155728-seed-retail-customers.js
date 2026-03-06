export async function up(queryInterface, Sequelize) {
  const retailCustomers = [
    {
      id: 1,
      businessName: "North Shore Retail",
      address: "Terminal A, Pier 4",
      phone: "+94 77 123 4567",
      creditLimit: 5000.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      businessName: "Harbor Mart",
      address: "Main Square 12",
      phone: "+94 81 234 5678",
      creditLimit: 3000.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      businessName: "East Point Market",
      address: "Coastal Road 5",
      phone: "+94 77 345 6789",
      creditLimit: 4000.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      businessName: "Island Resort",
      address: "South Beach Rd",
      phone: "+94 91 456 7890",
      creditLimit: 10000.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Clear existing data (optional - only if you want clean seed)
  await queryInterface.bulkDelete("retail_customers", null, {});

  // Insert the customers
  await queryInterface.bulkInsert("retail_customers", retailCustomers, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("retail_customers", null, {});
}
