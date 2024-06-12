import { Module } from '@nestjs/common';
import { SpacesService } from '../spaces/spaces.service';
import { SpacesController } from '../spaces/spaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from 'src/spaces/entities/space.entity';
import { Headquarter } from 'src/headquarters/entities/headquarters.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Space, Headquarter, User])],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {}
