import { Logger, Injectable } from '@nestjs/common';

import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { CreateRelayDto } from './dto/create-relay.dto';
import { UpdateRelayDto } from './dto/update-relay.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relay } from './entities/relay.entity';

@Injectable()
export class RelaysService {

  private readonly logger = new Logger(RelaysService.name);

  constructor(
    @InjectRepository(Relay) private relaysRepository: Repository<Relay>,
    @InjectQueue('relay') private relayInitQueue: Queue
  ) {}

  create(createRelayDto: CreateRelayDto) {
    this.logger.debug('Creating a new relay with url: ${createRelayDto.url}}')
    const relay = this.relaysRepository.create(createRelayDto);
    var result = this.relaysRepository.save(relay);

    // Add the new relay to the relay init queue
    this.relayInitQueue.add(result);
    return result;
  }

  update(arg0: number, updateRelayDto: UpdateRelayDto) {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Relay[]> {
    return this.relaysRepository.find();
  }

  findOne(id: number): Promise<Relay | null> {
    return this.relaysRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.relaysRepository.delete(id);
  }
}

