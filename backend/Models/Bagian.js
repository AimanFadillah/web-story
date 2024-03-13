const {DataTypes} = require("sequelize");
const db = require("../Database/config.js");
const Buku = require("./Buku.js");

const Bagian = db.define("bagian",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    nama:DataTypes.STRING,
},{freezeTableName:true});

Bagian.belongsTo(Buku,{foreignKey:"buku_id",onDelete:"CASCADE"});
Buku.hasMany(Bagian,{foreignKey:"buku_id"});

module.exports = Bagian;