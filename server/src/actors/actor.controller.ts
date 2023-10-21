import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ActorService } from './actor.service';
import { CreateActorDTO } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly castService: ActorService) {}

  @Get()
  async getAllActors() {
    return this.castService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async createActor(@Body() body: CreateActorDTO) {
    return this.castService.create(body);
  }
}
