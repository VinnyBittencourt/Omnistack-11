const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
    async index(req, res) {
        const ongs = await connection("ongs").select("*"); //Puxa da tabela ongs todos as informações de todas as ongs cadastradas

        return res.json(ongs);
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body; //Pega os campos do body para a inserção

        const id = crypto.randomBytes(4).toString("HEX"); //Cria um ID cryptografado pela biblioteca Crypto que já vem instalada no node

        await connection("ongs").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        }); //Insere no banco

        return res.json({ id });
    }
};
