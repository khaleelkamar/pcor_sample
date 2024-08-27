import { Injectable } from '@nestjs/common';
import { CreateSharedDto } from './dto/create-shared.dto';
import { UpdateSharedDto } from './dto/update-shared.dto';

@Injectable()
export class SharedService {
  create(createSharedDto: CreateSharedDto) {
    console.log(createSharedDto);
    return 'This action adds a new shared';
  }

  findAll() {
    return `This action returns all shared`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shared`;
  }

  update(id: number, updateSharedDto: UpdateSharedDto) {
    console.log(updateSharedDto);
    return `This action updates a #${id} shared`;
  }

  remove(id: number) {
    return `This action removes a #${id} shared`;
  }
}
