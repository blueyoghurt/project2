'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    upc: DataTypes.STRING,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    sellingPrice: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    createdBy: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return product;
};