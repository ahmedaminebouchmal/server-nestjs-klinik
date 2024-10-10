import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';

@Resolver(() => Invoice)
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Query(() => [Invoice])
  async invoices(): Promise<Invoice[]> {
    return this.invoicesService.findAll();
  }

  @Query(() => Invoice)
  async invoice(@Args('id') id: string): Promise<Invoice> {
    return this.invoicesService.findOne(id);
  }

  @Mutation(() => Invoice)
  async createInvoice(@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput): Promise<Invoice> {
    return this.invoicesService.create(createInvoiceInput);
  }

  @Mutation(() => Invoice)
  async updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput): Promise<Invoice> {
    return this.invoicesService.update(updateInvoiceInput.id, updateInvoiceInput);
  }

  @Mutation(() => Boolean)
  async removeInvoice(@Args('id') id: string): Promise<boolean> {
    return this.invoicesService.remove(id);
  }
}