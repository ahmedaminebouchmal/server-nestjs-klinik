import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingResolver } from './billing.resolver';
import { BillingService } from './billing.service';
import { Billing } from './entities/billing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  providers: [BillingResolver, BillingService],
})
export class BillingModule {}