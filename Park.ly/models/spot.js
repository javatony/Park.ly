'use strict';
module.exports = function(sequelize, DataTypes) {
  var Spot = sequelize.define('Spot', {
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    start_date_time: DataTypes.DATE,
    end_date_time: DataTypes.DATE,
    price: DataTypes.INTEGER,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    UserId: DataTypes.INTEGER,
    url: DataTypes.STRING
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
