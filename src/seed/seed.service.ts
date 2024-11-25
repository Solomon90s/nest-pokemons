import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

    //* Instalación de axios
    private readonly axios: AxiosInstance = axios;

    async executedSeed() {
        const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
        /*
        * Con el forEach recorremos el array de results
        * y hacemos la desestructuración de nombre y url
        */
        data.results.forEach(({ name, url }) => {
            /*
            * Con el segments separamos la url por la /
            * Con el no, lo que hacemos es obtener la penúltima posición del array que es el id del pokemon
            */
            const segments = url.split('/');
            const no = +segments[ segments.length - 2 ];
            console.log({ name, no });
            
        })
        return data.results;
    }
}
