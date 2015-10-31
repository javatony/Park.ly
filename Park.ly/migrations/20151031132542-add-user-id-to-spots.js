"use strict";

module.exports = {
  up: function (migration, Sequelize) {
    return migration
            .addColumn(
              "Spots",
              "UserId",
              {
                type: Sequelize.INTEGER,
                allowNull:true
              })
  },

  down: function (migration) {
    return migration
          .removeColumn("Sequelize","UserId")
  }
};

