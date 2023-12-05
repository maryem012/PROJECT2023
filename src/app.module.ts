import { AuthModule } from './auth/auth.module';
import { CertificationModule } from './certification/certification.module';
import { ComplaintModule } from './complaint/complaint.module';
import { RequestModule } from './request/request.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ComplaintController } from './complaint/complaint.controller';
import { ComplaintService } from './complaint/complaint.service';
import { RequestController } from './request/request.controller';
import { RequestService } from './request/request.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { CertificationController } from './certification/certification.controller';
import { CertificationService } from './certification/certification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyController } from './survey/survey.controller';
import { SurveyService } from './survey/survey.service';
import { MulterModule } from '@nestjs/platform-express';
import { SurveyModule } from './survey/survey.module';

@Module({

  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mariam:mariam@tekupstudent.dnot2e5.mongodb.net/?retryWrites=true&w=majority'
    ),
        AuthModule, 
        CertificationModule, 
        ComplaintModule, 
        RequestModule, 
        UserModule,
        MulterModule.register({
          dest: './uploads', // Specify the destination folder where uploaded files will be stored
        }),
        SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
