import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeType } from 'src/common/enums/coffe-type-enum';
@InputType({ description: 'inputType uchun ' })
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String, { description: 'yangi coffee nomi' })
  name: string;
  brand: string;
  flavors: string[];
  type: CoffeType;
}
