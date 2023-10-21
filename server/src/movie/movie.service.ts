import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateMovieDTO } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.movie.findMany({
      include: {
        genre: true,
        casts: true,
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async create(payload: CreateMovieDTO, user: Omit<User, 'password'>) {
    const movie = await this.prisma.movie.create({
      data: {
        title: payload.name,
        rating: payload.rating,
        releaseDate: payload.releaseDate,
        ownerId: user.id,
        genreId: payload.genre,
        casts: {
          connect: payload.cast.map((cast) => ({
            id: cast,
          })),
        },
      },
      include: {
        genre: true,
        casts: true,
      },
    });

    return movie;
  }
}
