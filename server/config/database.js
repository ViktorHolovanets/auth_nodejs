import { Sequelize } from "sequelize";
const sequelize=new Sequelize('modelsDb', 'root', 'password!23', {
  host: 'localhost',
  dialect: 'mysql',
});
export default sequelize;