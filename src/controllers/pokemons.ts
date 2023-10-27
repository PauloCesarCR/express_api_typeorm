import { Request, Response } from 'express'
const { getPokemonData } = require("../utility");
import { Iteam } from '../interfaces/IPokes';
import { GetTeamsObject } from '../interfaces/IPokes';
import { Teams } from '../entity/poke';
import { AppDataSource } from "../data-source"

const registerTeam = async (req: Request, res: Response) => {
  const { user, team } = req.body;
  const pokesAdd: Iteam[] = [];
  const pokemonsNotFound: string[] = []
  try {

    if (!user.trim() || team.length == 0) {
      return res.status(404).json(`Campos vazios não são permitidos`)
    }

    const pokemonDataPromises = team.map((name: string) => getPokemonData(name.toLocaleLowerCase()));
    const pokemonDataList = await Promise.all(pokemonDataPromises);

    pokemonDataList.forEach((data) => {
      if (!data.message) {
        const { id, name, weight, height } = data;
        pokesAdd.push({ id, name, weight, height });
        return;
      }
      pokemonsNotFound.push(data.message)
    });

    if (pokemonsNotFound.length > 0) {
      return res.status(404).json(`Pokemon(s) não encontrado, verifique o nome e tente novamente |  ${pokemonsNotFound.toString()} `)
    }

    const newTeam = new Teams()

    newTeam.owner = user.trim()
    newTeam.pokemons = JSON.stringify(pokesAdd)
    await AppDataSource.manager.save(newTeam)

    const { owner, pokemons } = newTeam
    return res.status(201).json({ owner, pokemons: JSON.parse(pokemons) });
  } catch (error) {
    return res.status(404).json(error);
  }
};

const getTeams = async (req: Request, res: Response) => {
  try {
    const teamsRepository = AppDataSource.getRepository(Teams)
    const teams = await teamsRepository.find()
    const pokes: GetTeamsObject[] = [];

    for (let item of teams) {
      const { id, owner } = item;

      pokes.push({
        [id]: {
          owner,
          pokemons: JSON.parse(item.pokemons),
        },
      });
    }

    return res.status(200).json(pokes);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getTeamId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const teamsRepository = AppDataSource.getRepository(Teams)
    const team = await teamsRepository.findOneBy({
      id: Number(id),
    })

    if (!team) {
      return res.status(404).json({ message: "not found" });
    }
    const { owner, pokemons } = team;
    return res.status(201).json({ owner, pokemons: JSON.parse(pokemons) });
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  registerTeam,
  getTeams,
  getTeamId,
};
