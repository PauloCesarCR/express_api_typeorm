import { pokeApi } from './services/api';

export async function getPokemonData(name: string) {
    try {
        const response = await pokeApi.get(name);
        return response.data;
    } catch (error) {
        return new Error(`${name}`);
    }
}
