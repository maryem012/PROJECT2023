import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { MorganInterceptor } from 'nest-morgan';
import { requestDto } from './dto/request.dto';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController { constructor(private readonly requestService : RequestService ) {}
//@UseGuards(AuthGuard('Cardiologist'))
@Post('/create') 
async createRequest(@Res() response, @Body() requestDto: requestDto) {
  try {
    const newrequest = await this.requestService.createRequest(requestDto);
    console.log(newrequest)
    return response.status(HttpStatus.OK).json({
    message: 'request has been created successfully',
    newrequest,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: request not created!',
    error: 'Bad Request'
 });
 }
}
@Get('/')
@ApiOkResponse({ type: [requestDto] })
async getrequests(@Res() res) {
  const requests= await this.requestService.getRequests();
  return res.status(HttpStatus.OK).json(requests);
}
@Get('/:id')
@ApiOkResponse({ type: requestDto })
async getrequest(@Res() response, @Param('id') requestId: string) {
  try {
     const existingrequest = await
 this.requestService.getRequest(requestId);
     return response.status(HttpStatus.OK).json({
     message: 'request found successfully',existingrequest,});
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
@UseInterceptors(MorganInterceptor('combined'))
@Delete('/:_id')
async deleteRequest(@Res() res, @Param('id') requestId: string)
{
  try {
    const deletedrequest = await this.requestService.deleteRequest(requestId);
    return res.status(HttpStatus.OK).json({
    message: 'request deleted successfully',
    deletedrequest,});
  }catch (err) {
    return res.status(err.status).json(err.res);
  }}

//@UseGuards(AuthGuard('Cardiologist'))
@Put(':_id')
@ApiCreatedResponse({ type: requestDto })
async updateRequest(@Res() response,@Param('id') requestId: string,
@Body() requestDto: requestDto) {
  try {
   const existingPres = await this.requestService.updateRequest(requestId, requestDto);
  return response.status(HttpStatus.OK).json({
  message: 'request has been successfully updated',
  existingPres,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }}}
