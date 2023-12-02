/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { certificationSchema } from './schema/certification.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [    MongooseModule.forFeature([{ name: 'certification', schema: certificationSchema }])
],
    controllers: [CertificationController],
    providers: [CertificationService],
})
export class CertificationModule { }
