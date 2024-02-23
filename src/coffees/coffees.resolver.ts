// import { CoffeeService } from './../coffee/coffee.service';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { CoffeesService } from './coffees.service';
import { UpdateCoffeeInput } from './dto/update-coffee.input/update-coffee.input';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeeservice: CoffeesService) {}
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return this.coffeeservice.findAll();
  }
  @Query(() => Coffee, { name: 'coffee' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeeservice.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return await this.coffeeservice.create(createCoffeeInput);
  }
  @Mutation(() => Coffee, { name: 'updateCoffee', nullable: true })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return await this.coffeeservice.update(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'delete', nullable: true })
  async delete(@Args('id', ParseIntPipe) id: number) {
    return await this.coffeeservice.delete(id);
  }
}
