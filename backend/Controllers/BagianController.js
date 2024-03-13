const { body } = require("express-validator");
const checkValidate = require("../Functions/checkValidate");
const Bagian = require("../Models/Bagian");
const { pesanSuccess } = require("../Functions/pesan");

const BagianController = {
    store:[
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        body("buku_id").notEmpty().withMessage("Buku wajib ada"),
        checkValidate,
        async function (req,res) {
            try{
                const body = req.body;
                const data = await Bagian.create(body);
                return pesanSuccess(res,data);
            }catch(e){
                return res.json(e);
            }
        }
    ],
    update:[
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        checkValidate,
        async function (req,res) {
            try{
                const body = req.body;
                const id = req.params.id;
                const data = await Bagian.update(body,{where:{id}}); 
                return pesanSuccess(res,data);
            }catch(e){
                return res.json(e);
            }
        }
    ],
    destroy:async function (req,res) {
        try{
            const id = req.params.id;
            await Bagian.destroy({where:id});
            return pesanSuccess(res);
        }catch(e){
            return res.json(e);
        }
    }
}

module.exports = BagianController;