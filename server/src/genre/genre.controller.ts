import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGenreDTO } from './dto/create-genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAllGenre() {
    return this.genreService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async createGenre(body: CreateGenreDTO) {
    return this.genreService.create(body);
  }
}
