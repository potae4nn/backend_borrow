import { Equipment } from './entities/equipment.entity';

export const equipmentProviders = [
  {
    provide: "EQUIPMENT_REPOSITORY",
    useValue: Equipment,
  },
];