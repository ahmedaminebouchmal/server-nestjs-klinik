import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(4)
  username: string;

  @Field()
  @IsString()
  @MinLength(8)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}