import { Location } from './entities/location.entity';

export const locationProviders = [
  {
    provide: "LOCATION_REPOSITORY",
    useValue: Location,
  },
];