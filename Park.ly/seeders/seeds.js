module.exports = {
up: function (queryInterface, Sequelize) {
queryInterface.bulkInsert( 'Users', [
        {
        address: 'USA',
        pr: 'USA',
        email: 'rtl',
        password: 'USA',
        created_at: new Date(1111, 1, 11),
        updated_at: new Date(1112, 1, 11),
        }
      ])
    },
  down: function (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Countries', null, {});
  }
};
