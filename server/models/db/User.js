import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import { v4 as uuidv4 } from 'uuid';
const User = sequelize.define(`User`,{
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    allowNull: false,
    primaryKey: true
},
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    birthday:{
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

},{
    timestamps:true,
    tableName:"users"
});
export default User;
