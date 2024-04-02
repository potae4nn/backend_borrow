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
import { Equipment } from '../../equipments/entities/equipment.entity';

@Table
export class Category extends Model<Category> {
  @Column({
    allowNull: false,
  })
  categoryId: string;

  @Column({
    allowNull: false,
  })
  categoryName: string;

  @HasMany(() => Equipment)
  borrowEquips: Equipment[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
