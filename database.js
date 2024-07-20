const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('NPC_IRS_TEST', 'postgres', 'jetta672', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

try {
  sequelize.authenticate();
  console.log('Подключение к базе данных установлено успешно.');
} catch (error) {
  console.error('Ошибка подключения к базе данных:', error);
}

module.exports = sequelize;
