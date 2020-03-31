const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query; //Para usar a paginação e com isso manter peformance

        const [count] = await connection("incidents").count(); //Para aparecer a quantidade total de registros

        const incidents = await connection("incidents")
            .join("ongs", "ongs.id", "=", "incidents.ong_id")
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                "incidents.*",
                "ongs.name",
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf"
            ]); //Listagem

        res.header("X-Total-Count", count["count(*)"]); //Faz com que o total apareça na header da requisição
        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body; //Pega os campos do body
        const ong_id = req.headers.authorization;

        const [id] = await connection("incidents").insert({
            title,
            description,
            value,
            ong_id
        }); //Insere os campos na tabela incidents
        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection("incidents")
            .where("id", id)
            .select("ong_id")
            .first();

        if (incident.ong_id !== ong_id) {
            //Verifica se o usuario está autenticado.
            return res.status(401).json({ error: "Operation not permitted." });
        }

        await connection("incidents")
            .where("id", id)
            .delete(); //Faz a exclusão

        return res.status(204).send(); //Responde com sucesso
    }
};
