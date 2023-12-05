import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { SurveySchema } from './schema/survey.schema';
import { complaintSchema } from 'src/complaint/schema/complaint.schema';

@Module({
        imports: [   
             MongooseModule.forFeature([{ name: 'surveyresult', schema: SurveySchema }])

],
    controllers: [SurveyController],
    providers: [SurveyService],
})
export class SurveyModule {}
