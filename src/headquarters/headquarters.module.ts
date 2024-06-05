import { Module } from '@nestjs/common';
import { HeadquartersService } from './headquarters.service';
import { HeadquartersController } from './headquarters.controller';

@Module({
  controllers: [HeadquartersController],
  providers: [HeadquartersService],
})
export class HeadquartersModule {}
