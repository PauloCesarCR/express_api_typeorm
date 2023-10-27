import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Teams {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    owner: string

    @Column("text")
    pokemons: string
}