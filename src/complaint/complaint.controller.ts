import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { complaintDto } from './dto/complaint.dto';
import { ComplaintService } from './complaint.service';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { MorganInterceptor } from 'nest-morgan';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService : ComplaintService) {}
//@UseGuards(AuthGuard('Cardiologist'))
@Post('/create') 
async createComplaint(@Res() response, @Body() complaintDto: complaintDto) {
  try {
    const newcomplaint = await this.complaintService.createcomplaint(complaintDto);
    console.log(newcomplaint)
    return response.status(HttpStatus.OK).json({
    message: 'complaint has been created successfully',
    newcomplaint,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: complaint not created!',
    error: 'Bad complaint'
 });
 }
}
@Get('/')
@ApiOkResponse({ type: [complaintDto] })
async getcomplaints(@Res() res) {
  const complaints= await this.complaintService.getcomplaints();
  return res.status(HttpStatus.OK).json(complaints);
}
@Get('/:id')
@ApiOkResponse({ type: complaintDto })
async getcomplaint(@Res() response, @Param('id') complaintId: string) {
  try {
     const existingcomplaint = await
 this.complaintService.getcomplaint(complaintId);
     return response.status(HttpStatus.OK).json({
     message: 'complaint found successfully',existingcomplaint,});
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
@UseInterceptors(MorganInterceptor('combined'))
@Delete('/:_id')
async deletecomplaint(@Res() res, @Param('id') complaintId: string)
{
  try {
    const deletedcomplaint = await this.complaintService.deletecomplaint(complaintId);
    return res.status(HttpStatus.OK).json({
    message: 'complaint deleted successfully',
    deletedcomplaint,});
  }catch (err) {
    return res.status(err.status).json(err.res);
  }}

//@UseGuards(AuthGuard('Cardiologist'))
@Put(':_id')
@ApiCreatedResponse({ type: complaintDto })
async updatecomplaint(@Res() response,@Param('id') complaintId: string,
@Body() complaintDto: complaintDto) {
  try {
   const existingPres = await this.complaintService.updatecomplaint(complaintId, complaintDto);
  return response.status(HttpStatus.OK).json({
  message: 'complaint has been successfully updated',
  existingPres,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }}}

