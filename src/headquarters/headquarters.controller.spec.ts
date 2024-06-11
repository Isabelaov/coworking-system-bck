import { Test, TestingModule } from '@nestjs/testing';
import { HeadquartersController } from './headquarters.controller';
import { HeadquartersService } from './headquarters.service';

describe('HeadquartersController', () => {
  let controller: HeadquartersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadquartersController],
      providers: [HeadquartersService],
    }).compile();

    controller = module.get<HeadquartersController>(HeadquartersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
