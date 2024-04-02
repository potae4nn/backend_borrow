import { Bill } from './entities/bill.entity';

export const billProviders = [
  {
    provide: "BILL_REPOSITORY",
    useValue: Bill,
  },
];