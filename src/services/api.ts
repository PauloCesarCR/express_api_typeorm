const axios = require("axios");

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/",
});

module.exports = pokeApi;
