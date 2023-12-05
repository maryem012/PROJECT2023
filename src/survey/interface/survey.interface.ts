// survey-json.interface.ts
export interface survey {
  createdAt: Date, // or any other relevant metadata
  filename: String,
  surveyId: String, // Add necessary fields for survey data
  studentId:String

  results: Object, // Store survey results as an obje
  }