import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JWTStrategy } from '../helper/jwt-strategy';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JWTStrategy],
})
export class AuthModule {}
