import { Module } from '@nestjs/common';

// imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

// controllers
import { AppController } from './app.controller';

// providers
import { AppService } from './app.service';
import { RelaysModule } from './relays/relays.module';

@Module({
  imports: [
    // ORM
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + './**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // Bull Redis backed work queue
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'relay',
    }),
    // my modules
    RelaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
