import { Test, TestingModule } from '@nestjs/testing';
import { DetailsEquipService } from './details-equip.service';

describe('DetailsEquipService', () => {
  let service: DetailsEquipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailsEquipService],
    }).compile();

    service = module.get<DetailsEquipService>(DetailsEquipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
