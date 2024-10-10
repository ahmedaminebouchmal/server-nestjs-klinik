import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    this.logger.log('Fetching all patients');
    return this.patientsRepository.find();
  }

  async findOne(id: string): Promise<Patient> {
    this.logger.log(`Fetching patient with id: ${id}`);
    const patient = await this.patientsRepository.findOne({ where: { id } });
    if (!patient) {
      this.logger.warn(`Patient with ID "${id}" not found`);
      throw new NotFoundException(`Patient with ID "${id}" not found`);
    }
    return patient;
  }

  async create(createPatientInput: CreatePatientInput): Promise<Patient> {
    this.logger.log(`Creating new patient with email: ${createPatientInput.email}`);
    const existingPatient = await this.patientsRepository.findOne({ where: { email: createPatientInput.email } });
    if (existingPatient) {
      this.logger.warn(`Patient with email "${createPatientInput.email}" already exists`);
      throw new ConflictException(`Patient with email "${createPatientInput.email}" already exists`);
    }
    const patient = this.patientsRepository.create(createPatientInput);
    return this.patientsRepository.save(patient);
  }

  async update(id: string, updatePatientInput: UpdatePatientInput): Promise<Patient> {
    this.logger.log(`Updating patient with id: ${id}`);
    const patient = await this.findOne(id);
    Object.assign(patient, updatePatientInput);
    return this.patientsRepository.save(patient);
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log(`Removing patient with id: ${id}`);
    const result = await this.patientsRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Patient with ID "${id}" not found`);
      throw new NotFoundException(`Patient with ID "${id}" not found`);
    }
    return true;
  }
}