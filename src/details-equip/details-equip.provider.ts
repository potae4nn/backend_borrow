import { DetailsEquip } from './entities/details-equip.entity';

export const borrowEquipProviders = [
  {
    provide: "DETAILSEQUIP_REPOSITORY",
    useValue: DetailsEquip,
  },
];