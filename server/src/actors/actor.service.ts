import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateActorDTO } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.actors.findMany();
  }

  async create(data: CreateActorDTO) {
    const actor = await this.prisma.actors.upsert({
      create: {
        name: data.name,
        name_computed: data.name.toLowerCase(),
      },

      update: {},

      where: {
        name_computed: data.name.toLowerCase(),
      },
    });

    return actor;
  }
}
