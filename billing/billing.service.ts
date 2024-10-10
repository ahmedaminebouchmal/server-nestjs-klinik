import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from './entities/billing.entity';
import { CreateBillingInput } from './dto/create-billing.input';
import { InvoicesService } from '../invoices/invoices.service';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
    private invoicesService: InvoicesService,
  ) {}

  // ... existing methods ...

  async processPayment(createBillingInput: CreateBillingInput): Promise<Billing> {
    this.logger.log(`Processing payment for invoice: ${createBillingInput.invoiceId}`);
    const invoice = await this.invoicesService.findOne(createBillingInput.invoiceId);
    
    if (invoice.status === 'paid') {
      throw new ConflictException('This invoice has already been paid');
    }

    if (createBillingInput.amountPaid !== invoice.amount) {
      throw new ConflictException('The payment amount does not match the invoice amount');
    }

    const billing = await this.create(createBillingInput);
    await this.invoicesService.markAsPaid(createBillingInput.invoiceId);

    return billing;
  }
}