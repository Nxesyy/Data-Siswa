import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { auth } from './dto/auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
    private readonly jwt: JwtService
  ) { }
  async auth(authDto: auth) {
    try {
      const { email, password } = authDto
      const findUser = await this.prisma.user.findFirst({
        where: { email }
      })
      if (!findUser) {
        return {
          succes: false,
          message: `email is Invalid`,
          data: null
        }
      }
      const ismatchPassword = await this.bcrypt.comparePassword(password, findUser.password)
      if (!ismatchPassword) {
        return {
          succes: false,
          message: `invalid password`,
          data: null
        }
      }

      const token = this.jwt.sign(
        {
          id: findUser.id, name: findUser.name, role: findUser.role
        })

        return {
          succes: true,
          message: `login success`,
          data: { token, name: findUser.name, role: findUser.role}
        }
    } catch (error) {
      return {
        succes: false,
        message: `error when sign in: ${error.message}`,
      }
    }
  }
}
