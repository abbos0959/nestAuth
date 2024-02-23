import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
@InputType({ description: 'inputType uchun ' })
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String, { description: 'yangi coffee nomi' })
  name: string;
  brand: string;
  flavors: string[];
}
