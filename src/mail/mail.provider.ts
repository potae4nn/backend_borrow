import { Mail } from './entities/mail.entity';

export const mailProviders = [
  {
    provide: "MAIL_REPOSITORY",
    useValue: Mail,
  },
];