import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  password: string;

  @Column()
  @Field()
  email: string;

  @Column({ default: 'user' })
  @Field()
  role: string;
}