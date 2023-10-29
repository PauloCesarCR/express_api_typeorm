import "reflect-metadata"
import { DataSource } from "typeorm"
import { Teams } from "./entity/poke"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Teams],
    subscribers: [],
    migrations: [],
})

