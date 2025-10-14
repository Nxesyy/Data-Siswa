import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
     @IsNotEmpty()
        @IsString()
        name: string
    
        @IsNotEmpty()
        @IsEmail()
        email: string
    
        @IsNotEmpty()
        @IsStrongPassword()
        password: string
}
