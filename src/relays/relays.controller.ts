import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelaysService } from './relays.service';
import { CreateRelayDto } from './dto/create-relay.dto';
import { UpdateRelayDto } from './dto/update-relay.dto';

@Controller('relays')
export class RelaysController {
  constructor(private readonly relaysService: RelaysService) {}

  @Post()
  create(@Body() createRelayDto: CreateRelayDto) {
    return this.relaysService.create(createRelayDto);
  }

  @Get()
  findAll() {
    return this.relaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelayDto: UpdateRelayDto) {
    return this.relaysService.update(+id, updateRelayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relaysService.remove(+id);
  }
}
