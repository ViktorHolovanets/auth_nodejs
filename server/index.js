import express from "express"
import routes from "./route/index.js"
import sequelize from "./config/database.js";
import User from "./models/db/User.js"
import { json } from "sequelize";
const PORT = 5000;
const app = express();
sequelize.sync({ force: true }) // Установіть { force: true } для видалення існуючих таблиць та створення нових
  .then(async () => {
    console.log('Database & tables created!');

    // Додавання деяких користувачів для тестування
    /*await User.bulkCreate([
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: '123456' },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', password: 'abcdef' }
    ]);*/
  });
app.use(express.json())
app.use("/", routes)
app.listen(PORT, () => console.log(`Start Server on Port : ${PORT}`))