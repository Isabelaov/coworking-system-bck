import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSpaceDto } from './dto/create-space.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { Repository, ReturnDocument } from 'typeorm';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { User } from 'src/users/entities/user.entity';
import { Headquarter } from 'src/headquarters/entities/headquarters.entity';

@Injectable()
export class SpacesService {
  private readonly logger = new Logger(SpacesService.name);
  @InjectRepository(Space) readonly spacesRepository: Repository<Space>;
  @InjectRepository(User) readonly usersRepository: Repository<User>;
  @InjectRepository(Headquarter) readonly headquarterRepository: Repository<Headquarter>;

  async create(createSpaceDto: CreateSpaceDto): Promise<ApiResponse<any>> {
    
    try{

      //Check that userId is valid
      const user = await this.usersRepository.findOne({
        where: {id: createSpaceDto.userId}
      });

      const headquarter = await this.headquarterRepository.findOne({
        where: {id: createSpaceDto.headquarterId}
      }); 

      if (!user){
        const err = new NotFoundException(`User with ID ${createSpaceDto.userId} not found`);
        this.logger.error(`Failed to create space: ${err.message}`)
        return { error: err.getResponse()['message'], statusCode: 400 }
      }  

      if (!headquarter) {
        const err = new NotFoundException(`Headquarter with ID ${createSpaceDto.headquarterId} not found`);
        this.logger.error(`Failed to create space: ${err.message}`);
        return { error: err.getResponse()['message'], statusCode: 400 };
      }
      
      const space = this.spacesRepository.create({...createSpaceDto, createdBy: user, headquarter})


      if(!space) {
        const err = new BadRequestException('Space not defined');
        this.logger.error(`Failed to create space: ${err.message}`);
        return { error: err.getResponse()['message'], statusCode: 400 };
    }

    await this.spacesRepository.insert(space);
    return { data: space, statusCode: 201 };

  } catch (error) {
    this.logger.error(`Failed to create spaces: ${error.message}`);
    const err = new BadRequestException(`Failed to create space: ${error.message}`);
    return { error: err.getResponse()['message'], statusCode: 400};
  }
}

  async findAll(): Promise<ApiResponse<any>> {
    let err;
    try {
      const spaces =  await this.spacesRepository.find()
      if (!spaces){
        err = new BadRequestException('No spaces defined');
        return {
          error: err.getResponse()['message'],
          statusCode: err.status
        }
      } 
      return {
        data: spaces,
        statusCode: 200
      }
    } catch (error) {
      this.logger.error('Failed to find spaces: ' + error.message);
      err = new BadRequestException('Failed to find spaces');
      return { error: err.getResponse()['message'], statusCode: err.status};
    }    
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
