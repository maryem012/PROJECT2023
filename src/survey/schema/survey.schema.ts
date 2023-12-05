
import { Schema } from 'mongoose';

export const SurveySchema = new Schema({
  createdAt: Date, // or any other relevant metadata
  filename: String,
  surveyId: String, // Add necessary fields for survey data
  results: Object, // Store survey results as an object
  studentId:String

});