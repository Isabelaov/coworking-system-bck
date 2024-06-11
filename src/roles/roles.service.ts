import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(name: string): Promise<ApiResponse<any>> {
    try {
      const newRole = this.roleRepository.create({ name });
      await this.roleRepository.save(newRole);
      return { data: newRole, statusCode: 200 };
    } catch (error) {
      const err = new BadRequestException(
        `Failed to create role: ${error.message}`,
      );
      this.logger.error(err.message);
      return { error: err.getResponse()['message'], statusCode: 400 };
    }
  }
}
