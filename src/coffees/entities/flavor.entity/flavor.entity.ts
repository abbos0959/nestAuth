import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany } from 'typeorm';
import { Coffee } from '../coffee.entity/coffee.entity';

@Entity()
@ObjectType()
export class Flavor {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToMany(() => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
