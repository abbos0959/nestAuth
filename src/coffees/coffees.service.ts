import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from '@nestjs/apollo';
import { UpdateCoffeeInput } from './dto/update-coffee.input/update-coffee.input';
import { Flavor } from './entities/flavor.entity/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,

    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  async findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: id } });

    if (!coffee) {
      throw new NotFoundException('bunday coffee mavjud emas ');
    }
    return coffee;
  }

  async create(createCoffeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeInput.flavors.map((item) => this.preoladByName(item)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeInput,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }
  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    // console.log(createCoffeInput, 'cofeeinput');

    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((item) => this.preoladByName(item)),
      ));
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });
    if (!coffee) {
      throw new UserInputError('bunday coffee mavjud emas jiyan');
    }
    return this.coffeeRepository.save(coffee);
  }

  async delete(id: number) {
    // console.log(createCoffeInput, 'cofeeinput');

    const coffee = await this.coffeeRepository.findOne({ where: { id: id } });
    if (!coffee) {
      throw new UserInputError('bunday coffee mavjud emas jiyan');
    }
    return this.coffeeRepository.remove(coffee);
  }

  private async preoladByName(name: string): Promise<Flavor> {
    const existCoffee = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existCoffee) {
      return existCoffee;
    }
    return this.flavorRepository.create({ name });
  }
}
