import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async create(createMailDto: any) {
    try {
      await this.mailerService.sendMail({
        to: createMailDto.borrowEquips[0]?.email,
        from: '"SHC Mail" <potae4nn@gmail.com>',
        subject:
          'อนุมัติการยืมอุปกรณ์กีฬา สำหรับ' +
          createMailDto.borrowEquips[0]?.fullname +
          ' เลขที่ใบยืม ' +
          createMailDto.id,
        template: 'index',
        context: {
          member: createMailDto?.borrowEquips[0],
          borrow: createMailDto?.borrowEquips,
        },
      });
      return { message: 'success' };
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
