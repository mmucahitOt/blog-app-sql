const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.sequelize.query(`
      UPDATE blogs
      SET year = ${new Date().getFullYear()}
      WHERE year IS NULL
    `);

    await queryInterface.changeColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        max: new Date().getFullYear(),
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
