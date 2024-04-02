import { Module, forwardRef } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { DatabaseModule } from '../database/database.module';
import { billProviders } from './bill.provider';
import { BorrowEquipModule } from 'src/borrow-equip/borrow-equip.module';
@Module({
  imports:[DatabaseModule,forwardRef(() => BorrowEquipModule)],
  controllers: [BillController],
  providers: [BillService,...billProviders],
  exports: [BillService],
})
export class BillModule {}
