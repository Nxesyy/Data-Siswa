import { Category } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    category: Category;

    @IsNotEmpty()
    @IsString()
    description: string;
}
