import { InputType, Field, Float } from '@nestjs/graphql';
import { IsUUID, IsNumber, IsDate, IsString, Min } from 'class-validator';

@InputType()
export class CreateInvoiceInput {
  @Field()
  @IsUUID()
  patientId: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  amount: number;

  @Field()
  @IsDate()
  dueDate: Date;

  @Field()
  @IsString()
  status: string;
}