import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateSiswaDto {
    @IsNotEmpty()
    @IsString()
    nisn: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(()=>Number)
    @Min(1)
    age: number;

    @IsNotEmpty()
    @IsString()
    address: string;
}
