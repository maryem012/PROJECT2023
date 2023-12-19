import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Put, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { survey } from './interface/survey.interface';

@Controller('survey')
export class SurveyController {
  constructor(private surveyService: SurveyService) { }
  @Get('/surveyresult/:filename')
  async getSurveyResultByname(@Param('filename') filename: string): Promise<any> {
    try {
      const surveyResult = await this.surveyService.getSurveyResultByname(filename);
      if (!surveyResult) {
        throw new NotFoundException('Survey result not found');
      }
      return { data: surveyResult, message: 'Survey result retrieved successfully' };
    } catch (error) {
      throw new NotFoundException(error.message || 'Survey result not found');
      // You can customize the error message based on the type of error or return specific error statuses
    }
  }
  @Get('/savedresults')
  async getSavedSurveyResults(): Promise<any> {
    try {
      const savedResults = await this.surveyService.getSavedSurveyResults(); // Fetch saved survey results from service
      return savedResults;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch saved survey results');
    }
  }
 


  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileParts = file.originalname.split('.');
          const fileExtension = fileParts[fileParts.length - 1];
          const newFileName = `${file.originalname}_${Date.now()}.${fileExtension}`;
          cb(null, newFileName);
        },
      }),

      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(json)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFiles(@UploadedFiles() file: Express.Multer.File) {
    if (!file) {
      return {
        error: 'File is not a json, please upload correct format',
      };
    }


  }
  @Get('/:filename')
  async getSurvey(@Param('filename') filename: string, @Res() res): Promise<any> {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename); // Adjust path
    res.sendFile(filePath);
  }
  @Post('save-results')
  async saveSurveyResults(@Body() results: any) {
    return this.surveyService.saveSurveyResults(results);
  }
  @Get('/:surveyId')
  async getSurveybyId(@Param('surveyId') surveyId: string, @Res() res): Promise<any> {
    const filePath = path.join(__dirname, '..', '..', 'uploads', surveyId); // Adjust path
    res.sendFile(filePath);
  }
  @Get('')
  async getSurveys(): Promise<survey> {
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    const files = await fs.promises.readdir(uploadsDir);

    const surveys: any = files.map((filename) => {
      const filePath = path.join(uploadsDir, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        createdAt: stats.birthtime, // Use any other relevant metadata
      };
    });

    return surveys;
  }

  @Delete('/:filename')
  async deleteSurveyFile(@Param('filename') filename: string, @Res() res): Promise<any> {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

    // Check if the file exists before attempting to delete
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Deletes the file
        return { message: 'File deleted successfully' };
      } else {
        return { error: 'File not found' };
      }
    } catch (error) {
      return { error: 'Failed to delete file' };
    }
  }


}