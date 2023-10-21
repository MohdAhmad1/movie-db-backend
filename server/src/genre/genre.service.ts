import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGenreDTO } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.genre.findMany();
  }

  async create(data: CreateGenreDTO) {
    const genre = await this.prisma.genre.upsert({
      create: {
        name: data.name,
      },

      update: {
        name: data.name,
      },

      where: {
        name: data.name,
      },
    });

    return genre;
  }
}
