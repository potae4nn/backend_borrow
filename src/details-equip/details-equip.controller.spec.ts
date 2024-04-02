import { Test, TestingModule } from '@nestjs/testing';
import { DetailsEquipController } from './details-equip.controller';
import { DetailsEquipService } from './details-equip.service';

describe('DetailsEquipController', () => {
  let controller: DetailsEquipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsEquipController],
      providers: [DetailsEquipService],
    }).compile();

    controller = module.get<DetailsEquipController>(DetailsEquipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
