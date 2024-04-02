import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { mailProviders } from './mail.provider';

@Module({
  controllers: [MailController],
  providers: [MailService,...mailProviders],
  exports: [MailService]
})
export class MailModule {}


