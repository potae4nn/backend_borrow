import { Module } from '@nestjs/common';
import { DetailsEquipService } from './details-equip.service';
import { DetailsEquipController } from './details-equip.controller';
import { borrowEquipProviders } from './details-equip.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [DetailsEquipController],
  providers: [DetailsEquipService,...borrowEquipProviders],
  exports:[DetailsEquipService]
})
export class DetailsEquipModule {}
