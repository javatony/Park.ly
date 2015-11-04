'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    start_date_time: DataTypes.DATE,
    end_date_time: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    SpotId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Reservation.belongsTo(models.User),
        Reservation.belongsTo(models.Spot);
      }
    }
  });
  return Reservation;
};
