import { Injectable } from '@nestjs/common';
import { CreateSiswaDto } from './dto/create-siswa.dto';
import { UpdateSiswaDto } from './dto/update-siswa.dto';
import { Siswa } from './entities/siswa.entity';

@Injectable()
export class SiswaService {
  private readonly siswa: CreateSiswaDto[] = [];
  create(createSiswaDto: CreateSiswaDto): Siswa {
    this.siswa.push(createSiswaDto)
    return 'This action adds a new siswa'

  }

  findAll() {
    return this.siswa
    //return `this action returns all siswa`
  }

  findOne(nisn: string) {
    return this.siswa.find((siswa) => siswa.nisn === nisn);
  }

  update(id: number, updateSiswaDto: UpdateSiswaDto) {
    return `This action updates a #${id} siswa`;
  }

  remove(id: number) {
    return `This action removes a #${id} siswa`;
  }
}
