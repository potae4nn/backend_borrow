import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowEquipDto } from './create-borrow-equip.dto';

export class UpdateBorrowEquipDto extends PartialType(CreateBorrowEquipDto) {}
