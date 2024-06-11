import { Injectable } from '@nestjs/common';
import { CreateSpaceDto } from './dto/create-space.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpacesService {
  @InjectRepository(Space) private readonly spacesRepository: Repository<Space>;

  async create(createSpaceDto: CreateSpaceDto) {
    const space = this.spacesRepository.create({ ...createSpaceDto });
    await this.spacesRepository.save(space);
    return space;
  }

  findAll() {
    return this.spacesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} space`;
  }

  // update(id: number, updateSpaceDto: UpdateSpaceDto) {
  //   return `This action updates a #${id} space`;
  // }

  remove(id: number) {
    return `This action removes a #${id} space`;
  }
}
