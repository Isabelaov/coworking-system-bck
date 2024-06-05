import { Module } from '@nestjs/common';
import { HeadquartersService } from '../headquarters/headquarters.service';
import { HeadquartersController } from '../headquarters/headquarters.controller';

@Module({
  controllers: [HeadquartersController],
  providers: [HeadquartersService],
  exports: [HeadquartersService],
})
export class HeadquartersModule {}
