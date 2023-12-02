import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { MorganInterceptor } from 'nest-morgan';
import { certificationDto } from './dto/certification.dto';
import { CertificationService } from './certification.service';

@Controller('certification')
export class CertificationController { constructor(private readonly certificationService : CertificationService ) {}
//@UseGuards(AuthGuard('Cardiologist'))
@Post('/create') 
async createOrd(@Res() response, @Body() certificationDto: certificationDto) {
  try {
    const newcertification = await this.certificationService.createcertification(certificationDto);
    console.log(newcertification)
    return response.status(HttpStatus.OK).json({
    message: 'certification has been created successfully',
    newcertification,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: certification not created!',
    error: 'Bad certification'
 });
 }
}
@Get('/')
@ApiOkResponse({ type: [certificationDto] })
async getcertifications(@Res() res) {
  const certifications= await this.certificationService.getcertifications();
  return res.status(HttpStatus.OK).json(certifications);
}
@Get('/:id')
@ApiOkResponse({ type: certificationDto })
async getcertification(@Res() response, @Param('id') certificationId: string) {
  try {
     const existingcertification = await
 this.certificationService.getcertification(certificationId);
     return response.status(HttpStatus.OK).json({
     message: 'certification found successfully',existingcertification,});
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
@UseInterceptors(MorganInterceptor('combined'))
@Delete('/:_id')
async deletecertification(@Res() res, @Param('id') certificationId: string)
{
  try {
    const deletedcertification = await this.certificationService.deletecertification(certificationId);
    return res.status(HttpStatus.OK).json({
    message: 'certification deleted successfully',
    deletedcertification,});
  }catch (err) {
    return res.status(err.status).json(err.res);
  }}

//@UseGuards(AuthGuard('Cardiologist'))
@Put(':_id')
@ApiCreatedResponse({ type: certificationDto })
async updatecertification(@Res() response,@Param('id') certificationId: string,
@Body() certificationDto: certificationDto) {
  try {
   const existingPres = await this.certificationService.updatecertification(certificationId, certificationDto);
  return response.status(HttpStatus.OK).json({
  message: 'certification has been successfully updated',
  existingPres,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }}}

