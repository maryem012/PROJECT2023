import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { request } from './interface/request.interface';
import { requestDto } from './dto/request.dto';

@Injectable()
export class RequestService {
     constructor(@InjectModel('requests') private readonly requestModel: Model<request>,) { }

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
  const existingrequest = await this.requestModel.findByIdAndUpdate(requestId, requestDto, { new: true });
  if (!existingrequest) {
    throw new NotFoundException(`requests #${requestId} not found`);
  }
  return existingrequest;
}}
