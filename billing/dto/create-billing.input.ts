import { InputType, Field, Float } from '@nestjs/graphql';
import { IsUUID, IsNumber, IsDate, IsString, Min } from 'class-validator';

@InputType()
export class CreateBillingInput {
  @Field()
  @IsUUID()
  invoiceId: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  amountPaid: number;

  @Field()
  @IsDate()
  paymentDate: Date;

  @Field()
  @IsString()
  paymentMethod: string;
}