import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsResolver } from './patients.resolver';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientsResolver, PatientsService],
})
export class PatientsModule {}