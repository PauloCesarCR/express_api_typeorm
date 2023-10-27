const pokeAPi = require("./services/api");

async function getPokemonData(name: string) {
    try {
        const response = await pokeAPi.get(name);
        return response.data;
    } catch (error) {
        return new Error(`${name}`);
    }
}

module.exports = { getPokemonData };
