// create-survey-json.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON } from 'class-validator';

export class SurveyDto {
  createdAt: Date // or any other relevant metadata
  filename: string
  surveyId: string // Add necessary fields for survey data
  results: object 
  studentId:string
}