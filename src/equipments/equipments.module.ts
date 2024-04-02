import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { equipmentProviders } from './equipments.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EquipmentsController],
  providers: [EquipmentsService, ...equipmentProviders],
  exports: [EquipmentsService],
})
export class EquipmentsModule {}
