import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateInvoiceInput } from './create-invoice.input';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
  @Field()
  id: string;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  status?: string;
}