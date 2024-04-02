import { Test, TestingModule } from '@nestjs/testing';
import { BorrowEquipService } from './borrow-equip.service';

describe('BorrowEquipService', () => {
  let service: BorrowEquipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowEquipService],
    }).compile();

    service = module.get<BorrowEquipService>(BorrowEquipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
