export interface Iteam {
    id: number,
    name: string,
    weight: number,
    height: number
}

export interface GetTeamsObject {
    [key: string]: {
        owner: string;
        pokemons: Iteam[];
    };
}