import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from '../flavor.entity/flavor.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';

@Entity()
@ObjectType({ description: 'coffee model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'bu unique hisoblanadi' })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // @Column({ type: 'json' })
  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];
  createdAt?: Date;
}
