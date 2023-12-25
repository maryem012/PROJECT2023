// mailer.module.ts

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {

        host: 'smtp-relay.brevo.com', // Your SMTP host
        port: 587, // Your SMTP port
        secure: false, // Set to true if your SMTP service uses SSL
        auth: {
          user: 'mariambenayed@outlook.com', // Your SMTP username
          pass: 'Qjgs5y2xpKRG7wYE', // Your SMTP password
        },
      },
      defaults: {
        from: 'Tekup <tekupMail@tekup.com>', // Sender email address
      },
    }),
    
  ],
})
export class MymailerModule {}
