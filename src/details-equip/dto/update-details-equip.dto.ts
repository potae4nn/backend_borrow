import { PartialType } from '@nestjs/swagger';
import { CreateDetailsEquipDto } from './create-details-equip.dto';

export class UpdateDetailsEquipDto extends PartialType(CreateDetailsEquipDto) {}
