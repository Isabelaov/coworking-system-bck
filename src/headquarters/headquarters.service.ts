import { Injectable } from '@nestjs/common';
import { CreateHeadquartersDto } from './dto/create-headquarters.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Headquarter } from './entities/headquarters.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HeadquartersService {
  @InjectRepository(Headquarter)
  private readonly headquartersRepository: Repository<Headquarter>;
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  async create(createHeadquartersDto: CreateHeadquartersDto) {
    const user = await this.usersRepository.findOne({
      where: {id: createHeadquartersDto.userId}
    })

    let headquarter = this.headquartersRepository.create({
      ...createHeadquartersDto,
      createdById: user,
      updatedById: user
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
