import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  survey } from './interface/survey.interface';
import { SurveyDto } from './dto/survey.dto';

@Injectable()
export class SurveyService {
  constructor(@InjectModel('surveyresult') private readonly surveyResultModel: Model<any>) {}

  async saveSurveyResults( results: any): Promise<any> {
    const newSurveyResult = new this.surveyResultModel({  results });
   return await newSurveyResult.save();
  }

  }