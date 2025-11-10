import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '@prisma/client';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
        @IsOptional()
        @IsString()
        name: string;
    
        @IsOptional()
        @IsNumber()
        price: number;
    
        @IsOptional()
        @IsString()
        category: Category;
    
        @IsOptional()
        @IsString()
        description: string;
}
