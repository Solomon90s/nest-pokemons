import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsPositive()
    @IsInt()
    @Min(1) //*Comprueba si el valor es mayor o igual al valor mínimo permitido
    no: number;

    @MinLength(1)
    @IsString()
    name: string
}
