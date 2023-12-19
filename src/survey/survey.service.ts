import { Injectable, NotFoundException } from '@nestjs/common';
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
  async getSavedSurveyResults(): Promise<any> {
    const savedResults = await this.surveyResultModel.find(); // Retrieve saved survey results from the database using the model
    return savedResults;
  }

  async getSurveyResultByname(filename: string): Promise<any[]> {
    const surveyResult = await this.surveyResultModel.find({ 'results.surveyName': filename }).exec();
    if (!surveyResult) {
      throw new NotFoundException('Survey result not found');
    }
    return surveyResult;
  }
  }