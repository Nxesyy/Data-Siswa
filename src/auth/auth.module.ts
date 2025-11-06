import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JWTStrategy } from '../helper/jwt-strategy';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JWTStrategy],
  imports: [
    PrismaModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: `jwt` }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || `secret-word`,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRATION) ?? 1400,
      }
    })
  ]
})
export class AuthModule { }
