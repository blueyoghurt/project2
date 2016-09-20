'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

  return queryInterface.bulkInsert('product', [{
    "upc": 'WETU342443',
    "name": 'Kindle Paperwhite',
    "category": 'Category B',
    "cost": 124.15,
    "sellingPrice": 145.60,
    "quantity": 13,
    "createdBy": 'Charles',
    "createdAt": "2016-09-19 10:19:21.334",
    "updatedAt": "2016-09-19 10:19:21.334"
  }], {});

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('product', null, {});
  }
};
