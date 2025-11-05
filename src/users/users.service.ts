import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';


@Injectable()
export class UsersService {
  constructor(private Prisma: PrismaService, private readonly bcrypt: BcryptService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      const user = await this.Prisma.user.create({
        data: {
          name,
          email,
          //password
          password: await this.bcrypt.hashPassword(password)
        },
      });

      return {
        succes: true,
        message: 'user data found succesfully',
        data: user,
      };
    } catch (eror) {
      return {
        succes: false,
        massage: `eror when get user ${eror.message}`,
        data: null,
      };
    }
  }

  async findAll() {
    try {
      const users = await this.Prisma.user.findMany()
      return {
        succes: true,
        message: 'user data found succesfully',
        data: users,
      };
    } catch (eror) {
      return {
        succes: false,
        massage: `eror when get user ${eror.message}`,
        data: null,
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { name, email, password } = updateUserDto
      const findUser = await this.Prisma.user.findFirst({
        where: { id: id }
      })
      if (!findUser) {
        return {
          succes: false,
          message: `User Does Not Exist`,
          data: null
        }
      }

      const upadteUser = await this.Prisma.user.update({
        where: { id: id },
        data: {
          name: name ?? findUser.name,
          email: email ?? findUser.name,
          //password: password ?? findUser.name
          password: password ? await this.bcrypt.hashPassword(password) : findUser.password
        }
      })

      return {
        succes: true,
        message: `New User has upadated`,
        data: upadteUser
      }
    } catch (error) {
      return {
        success: false,
        message: `error when update user: ${error.message}`,
        data: null
      }
    }
  }

  async remove(id: number) {
    try {
      const findUser = await this.Prisma.user.findFirst({
        where: {
          id: id
        }
      })
      if (!findUser) {
        return {
          success: false,
          message: `User does not exists`,
          data: null
        }
      }
      const deletedUser = await this.Prisma.user.delete({
        where: {
          id: id
        }
      })
      return {
        success: true,
        message: `user has deleted`,
        data: deletedUser
      }
    } catch (error) {
      return {
        success: false,
        message: `error when deleted ${error.message}`,
        data: null
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  Update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  Remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
