import { BorrowEquip } from './entities/borrow-equip.entity';

export const borrowEquipProviders = [
  {
    provide: "BORROWEQUIP_REPOSITORY",
    useValue: BorrowEquip,
  },
];