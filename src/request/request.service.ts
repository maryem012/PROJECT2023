import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { request } from './interface/request.interface';
import { requestDto } from './dto/request.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class RequestService {
     constructor(@InjectModel('requests') private readonly requestModel: Model<request>, private readonly notificationService: NotificationService,) { }

async getRequests(): Promise<request[]> {
  const requests = await this.requestModel.find();
  return requests;
}

async getRequest(requestId:string): Promise<request> {
  const existingrequest = await  this.requestModel.findById(requestId);
  console.log(existingrequest)
  if (!existingrequest) {
    throw new NotFoundException(`request #${requestId} not found`);
   }
   return existingrequest;
}



async createRequest(requestDto: requestDto): Promise<request> {
  const newrequest = new this.requestModel(requestDto);
  return newrequest.save();
}

async deleteRequest(requestId: string): Promise<request> {
  const deletedrequest= await this.requestModel.findByIdAndDelete(requestId);
 if (!deletedrequest) {
   throw new NotFoundException(`requests #${requestId} not found`);
 }
 return deletedrequest;
}

async updateRequest(requestId: string, requestDto: requestDto): Promise<request> {
  const existingRequest = await this.requestModel.findByIdAndUpdate(requestId, requestDto, { new: true });
  if (!existingRequest) {
    throw new NotFoundException(`Request #${requestId} not found`);
  }

  // Check if the status is 'treated' and trigger notification
  if (requestDto.status === 'treated') {
    const userId = existingRequest.studentId; // Assuming there's a userId field in your request document
    const message = 'Your request  has been treated.';
    await this.notificationService.createNotification(userId, message);
  }

  return existingRequest;
}}
