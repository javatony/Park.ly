"use strict";

module.exports = {
  up: function (migration, Sequelize) {
    return migration
            .addColumn(
              "Spots",
              "user_id",
              {
                type: Sequelize.INTEGER,
                allowNull:true
              })
  },

  down: function (migration) {
    return migration
          .removeColumn("Supots","user_id")
  }
};
