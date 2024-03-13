const { body } = require("express-validator");
const { pesanSuccess, pesanError } = require("../Functions/pesan");
const Buku = require("../Models/Buku");
const checkValidate = require("../Functions/checkValidate");

const BukuController = {
    get: async function (req, res) {
        try {
            const data = await Buku.findAll({ order: [["createdAt", "DESC"]] });
            return pesanSuccess(res, data);
        } catch (e) {
            return res.json(e);
        }
    },
    show: async function (req, res) {
        try {
            const id = req.params.id;
            const data = await Buku.findOne({ where: { id } });
            return pesanSuccess(res, data);
        } catch (e) {
            return res.json(e);
        }
    },
    store: [
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        checkValidate,
        async function (req, res) {
            try {
                const body = req.body;
                body.user_id = req.user.id;
                const data = await Buku.create(body);
                return pesanSuccess(res, data);
            } catch (e) {
                return res.json(e);
            }
        }
    ],
    update: [
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        checkValidate,
        async function (req, res) {
            try {
                const id = req.params.id;
                const body = req.body;
                await Buku.update(body, { where: { id } });
                const data = await Buku.findOne({ where: { id } });
                return pesanSuccess(res, data);
            } catch (e) {
                return res.json(e);
            }
        }
    ],
    destroy: async function (req, res) {
        try {
            const id = req.params.id;
            await Buku.destroy({ where: { id } });
            return pesanSuccess(res);
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = BukuController;