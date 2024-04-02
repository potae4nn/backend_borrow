import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { Equipment } from '../../equipments/entities/equipment.entity';
import { BorrowEquip } from '../../borrow-equip/entities/borrow-equip.entity';
import { Category } from '../../category/entities/category.entity';
import { Bill } from '../../bill/entities/bill.entity';
import { DetailsEquip } from '../../details-equip/entities/details-equip.entity';
import { Location } from '../../location/entities/location.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'testnest',
      });

      /**
       * Add Models Here
       * ===============
       * You can add the models to
       * Sequelize later on.
       */
      sequelize.addModels([
        User,
        Equipment,
        BorrowEquip,
        Category,
        Bill,
        DetailsEquip,
        Location
      ]);

      await sequelize.sync({ force: false, alter: true });
      return sequelize;
    },
  },
];
