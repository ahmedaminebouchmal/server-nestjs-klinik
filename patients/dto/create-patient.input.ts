import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsDate, IsPhoneNumber } from 'class-validator';

@InputType()
export class CreatePatientInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsDate()
  dateOfBirth: Date;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsPhoneNumber()
  phoneNumber: string;
}