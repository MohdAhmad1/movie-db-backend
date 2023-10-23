import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGenreDTO } from './dto/create-genre.dto';
import { GenreService } from './genre.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAllGenre() {
    return this.genreService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  async createGenre(@Body() body: CreateGenreDTO) {
    return this.genreService.create(body);
  }
}
