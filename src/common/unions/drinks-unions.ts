import { createUnionType } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

export const DrinkResultUnions = createUnionType({
  name: 'DrinkResults',
  types: () => [Coffee, Tea],
});
