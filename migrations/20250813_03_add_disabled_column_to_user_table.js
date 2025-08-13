const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.sequelize.query(`
      UPDATE users
      SET disabled = false
      WHERE disabled IS NULL
    `);

    await queryInterface.changeColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "disabled");
  },
};
