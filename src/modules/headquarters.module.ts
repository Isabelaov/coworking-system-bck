import { Module } from '@nestjs/common';
import { HeadquartersService } from '../headquarters/headquarters.service';
import { HeadquartersController } from '../headquarters/headquarters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Headquarter } from 'src/headquarters/entities/headquarters.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Headquarter, User])],
  controllers: [HeadquartersController],
  providers: [HeadquartersService],
  exports: [HeadquartersService],
})
export class HeadquartersModule {}
