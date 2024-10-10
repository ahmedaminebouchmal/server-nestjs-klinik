import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) {}

  // ... existing methods ...

  async calculateTotalForPatient(patientId: string): Promise<number> {
    this.logger.log(`Calculating total for patient: ${patientId}`);
    const invoices = await this.invoicesRepository.find({
      where: { patient: { id: patientId }, status: 'unpaid' },
    });
    return invoices.reduce((total, invoice) => total + invoice.amount, 0);
  }

  async markAsPaid(id: string): Promise<Invoice> {
    this.logger.log(`Marking invoice ${id} as paid`);
    const invoice = await this.findOne(id);
    invoice.status = 'paid';
    return this.invoicesRepository.save(invoice);
  }
}