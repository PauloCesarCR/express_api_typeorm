import * as express from 'express';

const { registerTeam, getTeams, getTeamId } = require("./controllers/pokemons");
const routes = express();

routes.post("/api/teams", registerTeam);
routes.get("/api/teams", getTeams);
routes.get("/api/teams/:id", getTeamId);


module.exports = routes;
