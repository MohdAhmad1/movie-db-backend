import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(user: Omit<User, 'password'>) {
    return this.prisma.movie.findMany({
      where: {
        ownerId: user.id,
      },
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
          connect: payload.casts.map((cast) => ({
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

  async updateMovieById(
    movieId: string,
    payload: UpdateMovieDTO,
    user: Omit<User, 'password'>,
  ) {
    const movie = await this.prisma.movie.findFirst({
      where: { id: movieId },
      include: { owner: true, casts: true, genre: true },
    });

    if (!movie) throw new NotFoundException();
    if (movie.ownerId !== user.id) throw new ForbiddenException();

    const data: Prisma.MovieUpdateInput = {};

    if (payload.name) data.title = payload.name;
    if (payload.rating) data.rating = payload.rating;
    if (payload.releaseDate) data.releaseDate = payload.releaseDate;
    if (payload.genre)
      data.genre = {
        connect: {
          id: payload.genre,
        },
      };

    if (payload.casts.length) {
      data.casts = {
        disconnect: movie.casts.map((cast) => ({
          id: cast.id,
        })),

        connect: payload.casts.map((cast) => ({
          id: cast,
        })),
      };
    }

    return this.prisma.movie.update({
      where: { id: movieId },
      data,
    });
  }

  async deleteMovieById(movieId: string, user: Omit<User, 'password'>) {
    const movie = await this.prisma.movie.findFirst({
      where: { id: movieId },
      select: { ownerId: true, id: true },
    });

    if (!movie) throw new NotFoundException();
    if (movie.ownerId !== user.id) throw new ForbiddenException();

    return this.prisma.movie.delete({ where: { id: movie.id } });
  }
}
