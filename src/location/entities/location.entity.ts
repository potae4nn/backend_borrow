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
import { DetailsEquip } from 'src/details-equip/entities/details-equip.entity';
import { Equipment } from 'src/equipments/entities/equipment.entity';
  
  @Table
  export class Location extends Model<Location> {
    @Column({
      allowNull: false,
      // unique: true,
    })
    locationName: string;

    @Column({
      allowNull: false,
      // unique: true,
    })
    locationId: string;

    @HasMany(() => DetailsEquip)
    detailsEquip: DetailsEquip[];
  
    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;
  }
  