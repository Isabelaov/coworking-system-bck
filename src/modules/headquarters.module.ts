import { Module } from '@nestjs/common';
import { HeadquartersService } from '../headquarters/headquarters.service';
import { HeadquartersController } from '../headquarters/headquarters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Headquarter } from 'src/headquarters/entities/headquarters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Headquarter])],
  controllers: [HeadquartersController],
  providers: [HeadquartersService],
  exports: [HeadquartersService],
})
export class HeadquartersModule {}
