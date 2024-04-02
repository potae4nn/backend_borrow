import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  HasMany,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { BorrowEquip } from 'src/borrow-equip/entities/borrow-equip.entity';

enum ENUMSTATUS {
  Return = 'return',
  Borrow = 'borrow',
  Wait = 'wait',
}

@Table
export class Bill extends Model<Bill> {
  @Column({
    allowNull: false,
  })
  billUUID: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ENUMSTATUS)),
    defaultValue: 'wait',
  })
  status: ENUMSTATUS;

  @HasMany(() => BorrowEquip)
  borrowEquips: BorrowEquip[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
