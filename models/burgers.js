module.exports = function(sequelize, DataTypes) {
  var Burgers = sequelize.define("burgers", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  });
  return Burgers;
};
