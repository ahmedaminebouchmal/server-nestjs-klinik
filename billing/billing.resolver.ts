import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BillingService } from './billing.service';
import { Billing } from './entities/billing.entity';
import { CreateBillingInput } from './dto/create-billing.input';

@Resolver(() => Billing)
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}

  @Query(() => [Billing])
  async billings(): Promise<Billing[]> {
    return this.billingService.findAll();
  }

  @Mutation(() => Billing)
  async createBilling(@Args('createBillingInput') createBillingInput: CreateBillingInput): Promise<Billing> {
    return this.billingService.create(createBillingInput);
  }
}