const{Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcryptjs = require('bcryptjs');
// check password
class User extends Model {
    checkPassword(loginPw) {
    return bcryptjs.compareSync(loginPw, this.password);
}
}
User.init({
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
},
username: {
    type: DataTypes.STRING,
    allowNull: false,
    },
password: {
    type: DataTypes.STRING,
    allowNull: false,
    valiadate: {
        len: [4]
    }
    },
},
{
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcryptjs.hash(newUserData.password, 10);
            return newUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});
module.exports = User;


