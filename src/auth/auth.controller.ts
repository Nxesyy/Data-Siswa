import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import FormatValidation from '../helper/validation-format';
import { auth } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UsePipes(new ValidationPipe({ exceptionFactory: FormatValidation }))
  auth(@Body() authDto: auth) {
    return this.authService.auth(authDto);
  }
}
