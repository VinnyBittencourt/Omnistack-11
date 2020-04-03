const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate"); //Ctrl + espaço dá pra ver todos os componentes que podem ser utilizados dentro das { }

//Puxando as controllers
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

//Todas as rotas da API e qual metodo estão usando da devida controller
routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post(
    "/ongs",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string()
                .required()
                .min(1), //as validações dos campos do body que estão sendo enviados nesta rota estão sendo feitos aqui.
            email: Joi.string()
                .required()
                .email(),
            whatsapp: Joi.string()
                .required()
                .min(10)
                .max(11),
            city: Joi.string().required(),
            uf: Joi.string()
                .required()
                .length(2)
        })
    }),
    OngController.create
);

routes.get(
    "/profile",
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()
    }),
    ProfileController.index
);

routes.post("/incidents", IncidentController.create);
routes.get(
    "/incidents",
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }),
    IncidentController.index
);
routes.delete(
    "/incidents/:id",
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),
    IncidentController.delete
); //Usando route param para pegar o ID do incident que será deletado.

module.exports = routes;
