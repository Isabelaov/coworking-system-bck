import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RolesService) {}

  @Post('create-role')
  async create(@Body('name') name: string) {
    const role = await this.roleService.create(name);
    return role;
  }
}
