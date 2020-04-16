require('dotenv').config();

module.exports = {
    dialect: 'postgres',
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    operatorAliases: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}
