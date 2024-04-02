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
import { Equipment } from '../../equipments/entities/equipment.entity';
import { Bill } from 'src/bill/entities/bill.entity';

 enum ENUMSTATUS {
  Return = 'return',
  Borrow = 'borrow',
  Wait = 'wait'
}

@Table
export class BorrowEquip extends Model<BorrowEquip> {
  // @Column({
  //   type: DataType.BIGINT,
  //   allowNull: false,
  //   autoIncrement: true,
  //   unique: true,
  //   primaryKey: true,
  // })
  // public id: number;

  @Column({
    allowNull: false,
  })
  borrow_date: Date;

  @Column({
    allowNull: false,
  })
  return_date: Date;

  @Column({
    allowNull: false,
  })
  member_id: string;

  // @Column({
  //   allowNull: false,
  // })
  // billId: string;

  @Column({
    allowNull: false,
  })
  branch: string;

  @Column({
    allowNull: false,
  })
  fullname: string;

  @Column({
    allowNull: false,
  })
  tel: string;

  @Column({
    allowNull: false,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  location: string;

  @Column({
    allowNull: false,
  })
  amount_borrowed: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ENUMSTATUS)),
    defaultValue: 'borrow',
  })
  status: ENUMSTATUS;

  @ForeignKey(() => Equipment)
  @Column
  equipmentId: number;

  @BelongsTo(() => Equipment)
  equipment: Equipment;

  @ForeignKey(() => Bill)
  @Column
  billId: number;

  @BelongsTo(() => Bill)
  bill: Bill;
  
  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
