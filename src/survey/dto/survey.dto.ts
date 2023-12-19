// create-survey-json.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON } from 'class-validator';

export class SurveyDto {
  createdAt: Date 
  filename: string
  surveyId: string // Add necessary fields for survey data
  results: object 
  studentId:string
}