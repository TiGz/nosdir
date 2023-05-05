import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { RelaysService } from './relays.service';
import { RelaysController } from './relays.controller';
import { Relay } from './entities/relay.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Relay]),
    BullModule.registerQueue({
    name: 'relay',
    }),
  ],
  controllers: [RelaysController],
  providers: [RelaysService],
  exports: [TypeOrmModule]
})
export class RelaysModule {}
