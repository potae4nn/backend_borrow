import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { BorrowEquipModule } from './borrow-equip/borrow-equip.module';
import { AuthModule } from './auth/auth.module';
import config from './config/configuration';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryModule } from './category/category.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { HttpModule } from '@nestjs/axios';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BillModule } from './bill/bill.module';
import { DetailsEquipModule } from './details-equip/details-equip.module';
import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { LocationModule } from './location/location.module';

// import * as handlebars from 'handlebars';
import * as moment from 'moment';

const incrementIndexFn = (value: number) => {
  return value + 1;
};

const totalQuantityFn = (value: any[]) => {
  const quantityArray = [];
  value.map((res) => {
    quantityArray.push(res.quantity);
  });
  const totalValue = quantityArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return totalValue;
};

const setFormatDateThShot = (dateData: any) => {
  const d = new Date(dateData);
  const monthTh = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ตุ.ค.',
    'พ.ย.',
    'ธ.ค.',
  ];
  const dayTh = [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์',
  ];

  return (
    dayTh[d.getDay()] +
    ' ที่ ' +
    (d.getDate() > 9 ? '' : '0') +
    d.getDate().toString() +
    ' ' +
    monthTh[d.getMonth()] +
    ' ' +
    (Number(d.getFullYear()) + 543)
  );
};

const dayBookReturn = (value1: any, value2: any) => {
  return moment(value1).diff(value2, 'days') + 1;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    UserModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', //host
        port: 465,
        secure: true,
        auth: {
          user: 'potae4nn@gmail.com', // your email
          pass: 'zrmytywvkqkfbpnc', // your email password
        },
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter({
          incrementIndex: incrementIndexFn,
          totalQuantity: totalQuantityFn,
          formatDateThShot: setFormatDateThShot,
          dayBookReturn: dayBookReturn,
        }),
        options: {
          strict: true,
        },
      },
    }),
    DatabaseModule,
    EquipmentsModule,
    BorrowEquipModule,
    AuthModule,
    MulterModule.register(),
    CategoryModule,
    MailModule,
    HttpModule,
    BillModule,
    DetailsEquipModule,
    LocationModule,
  ],
  controllers: [AppController, ImagesController],
  providers: [AppService, ImagesService],
})
export class AppModule {}
