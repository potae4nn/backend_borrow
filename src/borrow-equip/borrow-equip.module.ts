import { Module } from '@nestjs/common';
import { BorrowEquipService } from './borrow-equip.service';
import { BorrowEquipController } from './borrow-equip.controller';
import { DatabaseModule } from '../database/database.module';
import { borrowEquipProviders } from './borrow-equip.provider';
import { EquipmentsModule } from '../equipments/equipments.module';
import { MailModule } from '../mail/mail.module';
import { BillModule } from '../bill/bill.module';
import { DetailsEquipModule } from '../details-equip/details-equip.module';

@Module({
  imports: [
    DatabaseModule,
    EquipmentsModule,
    MailModule,
    BillModule,
    DetailsEquipModule,
  ],
  controllers: [BorrowEquipController],
  providers: [BorrowEquipService, ...borrowEquipProviders],
  exports: [BorrowEquipService],
})
export class BorrowEquipModule {}
