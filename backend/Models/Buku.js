const {DataTypes} = require("sequelize");
const db = require("../Database/config.js");
const User = require("./User.js");

const Buku = db.define("buku",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    nama:DataTypes.STRING,
},{freezeTableName:true});

Buku.belongsTo(User,{foreignKey:"user_id",onDelete:"CASCADE"});
User.hasMany(Buku,{foreignKey:"user_id"});

module.exports = Buku;
