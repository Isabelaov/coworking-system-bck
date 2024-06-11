import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const findClient =
        (await this.findByUsernameOrEmail(
          createClientDto.email.toLowerCase(),
        )) ||
        (await this.findByUsernameOrEmail(createClientDto.name.toLowerCase()));

      if (findClient.data != undefined) {
        const err = new ConflictException('User duplicated');
        this.logger.error(`Failed to create user: ${err.message}`);

        return { error: err.getResponse()['message'], statusCode: 400 };
      }

      const { password, ...clientData } = createClientDto;
      let client = this.clientsRepository.create({
        ...clientData,
        password: bcrypt.hashSync(password, 10),
        createdBy: 0,
        updatedBy: 0,
      });

      client = await this.clientsRepository.save(client);
      client.createdBy = client.id;
      client.updatedBy = client.id;
      await this.clientsRepository.save(client);
      delete client.password;

      return { data: client, statusCode: 200 };
    } catch (error) {
      this.logger.error(`Failed to create client: ${error.message}`);
      const err = new BadRequestException(
        `Failed to create user: ${error.message}`,
      );

      return { error: err.getResponse()['message'], statusCode: 400 };
    }
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  // update(id: number, updateClientDto: UpdateClientDto) {
  //   return `This action updates a #${id} client`;
  // }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }

  async findByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<ApiResponse<any>> {
    let err;
    try {
      const user = await this.clientsRepository.findOne({
        where: [{ name: usernameOrEmail }, { email: usernameOrEmail }],
        select: {
          name: true,
          password: true,
          email: true,
          id: true,
          emailConfirmed: true,
        },
      });

      if (!user) {
        err = new BadRequestException('User not found');
        return {
          error: err.getResponse()['message'],
          statusCode: err.status,
        };
      }

      return { data: user, statusCode: 200 };
    } catch (error) {
      this.logger.error(`Failed to find user: ${error.message}`);
      err = new BadRequestException('Failed to find user');

      return { error: err.getResponse()['message'], statusCode: err.status };
    }
  }
}
