import express from "express"
import routes from "./route/index.js"
import sequelize from "./config/database.js";
const PORT = 5000;
const app = express();
sequelize.sync() 
  .then(async () => {
    console.log('Database & tables created!');   
  })
  .catch(error => {
    console.error('Error:', error);
});;
app.use(express.json())
app.use("/", routes)
app.listen(PORT, () => console.log(`Start Server on Port : ${PORT}`))