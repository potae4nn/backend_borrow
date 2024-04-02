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
} from 'sequelize-typescript';
import { Equipment } from '../../equipments/entities/equipment.entity';

@Table
export class User extends Model<User> {
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
  username: string;

  @Column({
    allowNull: false,
  })
  fname: string;

  @Column({
    allowNull: false,
  })
  lname: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @HasMany(() => Equipment)
  borrowEquips: Equipment[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
