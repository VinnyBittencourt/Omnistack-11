const connection = require("../database/connection");
module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await connection("ongs")
            .where("id", id)
            .select("name")
            .first(); //Query para pesquisar na tabela ongs se existe o ID pesquisado

        if (!ong) {
            return res
                .status(400)
                .json({ error: "No ONG found with this id." }); //Resposta em caso de erro
        }

        return res.json(ong);
    }
};
