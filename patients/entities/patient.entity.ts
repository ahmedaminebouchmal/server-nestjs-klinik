import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  dateOfBirth: Date;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  phoneNumber: string;
}