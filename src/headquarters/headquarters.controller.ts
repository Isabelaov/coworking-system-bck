import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HeadquartersService } from './headquarters.service';
import { CreateHeadquartersDto } from './dto/create-headquarters.dto';

@Controller('headquarters')
export class HeadquartersController {
  constructor(private readonly headquartersService: HeadquartersService) {}

  @Post()
  create(@Body() createHeadquartersDto: CreateHeadquartersDto) {
    return this.headquartersService.create(createHeadquartersDto);
  }

  @Get()
  findAll() {
    return this.headquartersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headquartersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHeadquartersDto: UpdateHeadquartersDto) {
  //   return this.headquartersService.update(+id, updateHeadquartersDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headquartersService.remove(+id);
  }
}
