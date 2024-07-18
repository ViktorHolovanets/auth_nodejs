import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import { v4 as uuidv4 } from 'uuid';
import User from "./User.js";

const TokenRefresh = sequelize.define('TokenRefresh', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: "tokens"
});

TokenRefresh.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
User.hasOne(TokenRefresh, { foreignKey: 'user_id' });

export default TokenRefresh;
