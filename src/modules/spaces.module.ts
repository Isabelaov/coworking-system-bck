import { Module } from '@nestjs/common';
import { SpacesService } from '../spaces/spaces.service';
import { SpacesController } from '../spaces/spaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from 'src/spaces/entities/space.entity';
import { Headquarter } from 'src/headquarters/entities/headquarters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space, Headquarter])],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {}
