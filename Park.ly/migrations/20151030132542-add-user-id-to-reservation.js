"use strict";

module.exports = {
  up: function (migration, Sequelize) {
    return migration
            .addColumn(
              "Reservations",
              "user_id",
              {
                type: Sequelize.INTEGER,
                allowNull:true
              })
  },

  down: function (migration) {
    return migration
          .removeColumn("Reservations","user_id")
  }
};

module.exports = {
  up: function (migration, Sequelize) {
    return migration
            .addColumn(
              "Reservations",
              "spot_id",
              {
                type: Sequelize.INTEGER,
                allowNull:true
              })
  },

  down: function (migration) {
    return migration
          .removeColumn("Reservations","spot_id")
  }
};
