const { body } = require("express-validator");
const { pesanSuccess } = require("../Functions/pesan");
const Buku = require("../Models/Buku");
const checkValidate = require("../Functions/checkValidate");

const BukuController = {
    get: async function (req, res) {
        try {
            const data = await Buku.findAll();
            return pesanSuccess(res, data);
        } catch (e) {
            return res.json(e);
        }
    },
    store:[
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        checkValidate,
        async function (req,res){
            try{
                const body = req.body;
                body.user_id = req.user.id;
                const data = await Buku.create(body);
                return pesanSuccess(res,data);
            }catch(e){
                return res.json(e);
            }
        }
    ]
}

module.exports = BukuController;