import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity()
@ObjectType()
export class Billing {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Invoice)
  @Field(() => Invoice)
  invoice: Invoice;

  @Column('decimal')
  @Field(() => Float)
  amountPaid: number;

  @Column()
  @Field()
  paymentDate: Date;

  @Column()
  @Field()
  paymentMethod: string;
}