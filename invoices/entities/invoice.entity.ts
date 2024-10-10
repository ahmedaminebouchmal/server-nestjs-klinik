import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Patient } from '../../patients/entities/patient.entity';

@Entity()
@ObjectType()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Patient)
  @Field(() => Patient)
  patient: Patient;

  @Column('decimal')
  @Field(() => Float)
  amount: number;

  @Column()
  @Field()
  dueDate: Date;

  @Column()
  @Field()
  status: string;
}