import { Injectable } from '@nestjs/common';
import { CreateHeadquartersDto } from './dto/create-headquarters.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Headquarter } from './entities/headquarters.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeadquartersService {
  @InjectRepository(Headquarter)
  private readonly headquartersRepository: Repository<Headquarter>;

  async create(createHeadquartersDto: CreateHeadquartersDto) {
    let headquarter = this.headquartersRepository.create({
      ...createHeadquartersDto,
      createdBy: createHeadquartersDto.user,
      updatedBy: createHeadquartersDto.user,
    });
    headquarter = await this.headquartersRepository.save(headquarter);
    return headquarter;
  }

  findAll() {
    return `This action returns all headquarters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} headquarters`;
  }

  remove(id: number) {
    return `This action removes a #${id} headquarters`;
  }
}
