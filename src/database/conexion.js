import Sequelize  from "sequelize";

const db = new Sequelize("adopcion","adopcion","123",{
    dialect: "mysql",
    host: "localhost"
});

export {db}