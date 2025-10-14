import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  findAll: any;
  constructor(private Prisma: PrismaService){}
  
 async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      const user = await this.Prisma.user.create({
        data: {
          name,
          email,
          password,
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
