const { userRepository } = require("../src/repositories");
const { sequelize } = require("../src/utils/db");
const readline = require("readline-sync");

const disableUser = async () => {
  try {
    const userIdInput = readline.question("Please provide the user id: ");

    if (!userIdInput) {
      console.log("No user ID provided. Exiting...");
      return;
    }

    const userId = parseInt(userIdInput);
    if (isNaN(userId)) {
      console.log("Invalid user ID. Please provide a valid number.");
      return;
    }

    await sequelize.authenticate();
    console.log("Connected to database successfully.");

    const user = await userRepository.disableUserById(userId);

    if (!user) {
      console.log(`User with ID ${userId} not found.`);
      return;
    }

    console.log(
      `User ${user.name} (${user.username}) has been disabled successfully.`
    );
    console.log("User details:", user);
  } catch (error) {
    console.error("Error disabling user:", error.message);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
};

// Handle the async function properly
disableUser().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
