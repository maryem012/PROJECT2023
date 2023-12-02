import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { certification } from './interface/certification.interface';
import { certificationDto } from './dto/certification.dto';

@Injectable()
export class CertificationService {
    constructor(@InjectModel('certification') private readonly certificationModel: Model<certification>,) { }

    async getcertifications(): Promise<certification[]> {
      const certifications = await this.certificationModel.find();
      return certifications;
    }
    
    async getcertification(certificationId:string): Promise<certification> {
      const existingcertification = await  this.certificationModel.findById(certificationId);
      console.log(existingcertification)
      if (!existingcertification) {
        throw new NotFoundException(`certification #${certificationId} not found`);
       }
       return existingcertification;
    }
    
    
    
    async createcertification(certificationDto: certificationDto): Promise<certification> {
      const newcertification = new this.certificationModel(certificationDto);
      return newcertification.save();
    }
    
    async deletecertification(certificationId: string): Promise<certification> {
      const deletedcertification= await this.certificationModel.findByIdAndDelete(certificationId);
     if (!deletedcertification) {
       throw new NotFoundException(`certifications #${certificationId} not found`);
     }
     return deletedcertification;
    }
    
    async updatecertification(certificationId: string, certificationDto: certificationDto): Promise<certification> {
      const existingcertification = await this.certificationModel.findByIdAndUpdate(certificationId, certificationDto, { new: true });
      if (!existingcertification) {
        throw new NotFoundException(`certifications #${certificationId} not found`);
      }
      return existingcertification;
    }}
    