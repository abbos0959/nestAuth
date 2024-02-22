import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CoffeeModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
