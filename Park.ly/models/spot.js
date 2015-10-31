'use strict';
module.exports = function(sequelize, DataTypes) {
  var Spot = sequelize.define('Spot', {
    address: DataTypes.STRING,
    start_date_time: DataTypes.DATE,
    end_date_time: DataTypes.DATE,
    price: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Spot.belongsTo(models.User),
        Spot.hasMany(models.Reservation);
      }
    }
  });
  return Spot;
};
