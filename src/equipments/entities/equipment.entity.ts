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
} from 'sequelize-typescript';
import { BorrowEquip } from '../../borrow-equip/entities/borrow-equip.entity';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { DetailsEquip } from 'src/details-equip/entities/details-equip.entity';
import { Location } from 'src/location/entities/location.entity';

export enum ENUMSTATUS {
  Remove = 'remove',
  Used = 'used',
}

@Table
export class Equipment extends Model<Equipment> {
  @Column({
    allowNull: false,
  })
  equipname: string;

  @Column({
    allowNull: false,
  })
  details: string;

  @Column({
    allowNull: false,
  })
  image: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ENUMSTATUS)),
    defaultValue: 'used',
  })
  status: ENUMSTATUS;

  @HasMany(() => BorrowEquip)
  borrowEquips: BorrowEquip[];

  @HasMany(() => DetailsEquip)
  detailEquip: DetailsEquip[];

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
