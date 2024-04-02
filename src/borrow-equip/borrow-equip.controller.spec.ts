import { Test, TestingModule } from '@nestjs/testing';
import { BorrowEquipController } from './borrow-equip.controller';
import { BorrowEquipService } from './borrow-equip.service';

describe('BorrowEquipController', () => {
  let controller: BorrowEquipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowEquipController],
      providers: [BorrowEquipService],
    }).compile();

    controller = module.get<BorrowEquipController>(BorrowEquipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
