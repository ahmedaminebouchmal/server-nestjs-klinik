import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesResolver } from './invoices.resolver';
import { InvoicesService } from './invoices.service';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoicesResolver, InvoicesService],
})
export class InvoicesModule {}