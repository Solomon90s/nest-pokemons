import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

/*
* Esto significa que updatePokemonDto que tiene todas las propiedades de CreatePokemonDto PERO ESTAS VAN A SER OPCIONALES
*/
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
