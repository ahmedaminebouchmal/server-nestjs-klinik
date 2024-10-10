import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';

@Resolver(() => Patient)
@UseGuards(JwtAuthGuard)
export class PatientsResolver {
  constructor(private readonly patientsService: PatientsService) {}

  @Query(() => [Patient])
  async patients(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Query(() => Patient)
  async patient(@Args('id') id: string): Promise<Patient> {
    return this.patientsService.findOne(id);
  }

  @Mutation(() => Patient)
  async createPatient(@Args('createPatientInput') createPatientInput: CreatePatientInput): Promise<Patient> {
    return this.patientsService.create(createPatientInput);
  }

  @Mutation(() => Patient)
  async updatePatient(@Args('updatePatientInput') updatePatientInput: UpdatePatientInput): Promise<Patient> {
    return this.patientsService.update(updatePatientInput.id, updatePatientInput);
  }

  @Mutation(() => Boolean)
  async removePatient(@Args('id') id: string): Promise<boolean> {
    return this.patientsService.remove(id);
  }
}