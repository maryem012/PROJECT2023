import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { complaint } from './interface/complaint.interface';
import { complaintDto } from './dto/complaint.dto';

@Injectable()
export class ComplaintService { constructor(@InjectModel('complaint') private readonly complaintModel: Model<complaint>,) { }

async getcomplaints(): Promise<complaint[]> {
  const complaints = await this.complaintModel.find() ;
  return complaints;
}

async getcomplaint(complaintId:string): Promise<complaint> {
  const existingcomplaint = await  this.complaintModel.findById(complaintId) 
  console.log(existingcomplaint)
  if (!existingcomplaint) {
    throw new NotFoundException(`complaint #${complaintId} not found`);
   }
   return existingcomplaint;
}



async createcomplaint(complaintDto: complaintDto): Promise<complaint> {
  const newcomplaint = new this.complaintModel(complaintDto);
  return newcomplaint.save();
}

async deletecomplaint(complaintId: string): Promise<complaint> {
  const deletedcomplaint= await this.complaintModel.findByIdAndDelete(complaintId);
 if (!deletedcomplaint) {
   throw new NotFoundException(`complaints #${complaintId} not found`);
 }
 return deletedcomplaint;
}

async updatecomplaint(complaintId: string, complaintDto: complaintDto): Promise<complaint> {
  const existingcomplaint = await this.complaintModel.findByIdAndUpdate(complaintId, complaintDto, { new: true });
  if (!existingcomplaint) {
    throw new NotFoundException(`complaints #${complaintId} not found`);
  }
  return existingcomplaint;
}}

