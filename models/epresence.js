const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");

const Epresence = sequelize.define(
  "Epresence",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("IN", "OUT"),
      allowNull: false,
    },
    isApprove: {
      type: DataTypes.ENUM("TRUE", "FALSE"),
      allowNull: true,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Epresence.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Epresence, { foreignKey: "userId" });

module.exports = Epresence;
