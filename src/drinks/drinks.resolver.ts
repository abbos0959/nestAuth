import { Resolver, Query } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { DrinkResultUnions } from 'src/common/unions/drinks-unions';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinkResultUnions], { name: 'drinks' })
  async findAll(): Promise<(typeof DrinkResultUnions)[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Uzbekistan';
    coffee.brand = 'qarshi coffeesi';

    const tea = new Tea();
    tea.name = "ko'k choy";
    return [coffee, tea];
  }
}
