'use strict';
module.exports = (sequelize, DataTypes) => {
  const Obat = sequelize.define('Obat', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    id_supplier: DataTypes.INTEGER
  }, {});
  Obat.associate = function(models) {
    // associations can be defined here
  };
  return Obat;
};