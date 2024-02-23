import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { CoffeesModule } from './coffees/coffees.module';
import { DataScalar } from './common/scalars/data.scalar/data.scalar';
import { Tea } from './teas/entities/tea.entity/tea.entity';
import { DrinksResolver } from './drinks/drinks.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      entities: [__dirname + '/../**/*.entity.js'],
      // entities: [UserEntity, ReportsEntity],
      // migrations: [__dirname, '**', '*{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [Tea],
      },
    }),
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataScalar, DrinksResolver],
})
export class AppModule {}
