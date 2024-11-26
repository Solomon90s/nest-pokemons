import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
    //* Hacemos la inyección de nuestra entidad
    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter,
    ) {}

    async executedSeed() {
        await this.pokemonModel.deleteMany({}); // delete * from pokemons;
        const data  = await this.http.get<PokeResponse>(
            'https://pokeapi.co/api/v2/pokemon?limit=650',
        );
        const pokemonToInsert: { name: string; no: number }[] = [];
        /*
         * Con el forEach recorremos el array de results
         * y hacemos la desestructuración de nombre y url
         */
        data.results.forEach(async ({ name, url }) => {
            /*
             * Con el segments separamos la url por la /
             * Con el no, lo que hacemos es obtener la penúltima posición del array que es el id del pokemon
             */
            const segments = url.split('/');
            const no = +segments[segments.length - 2];
            pokemonToInsert.push({ name, no });
        });
        this.pokemonModel.insertMany(pokemonToInsert);
        return 'SEED executed';
    }
}
