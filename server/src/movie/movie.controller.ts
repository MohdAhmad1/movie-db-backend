import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MovieService } from './movie.service';
import { CreateMovieDTO } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.movieService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateMovieDTO, @Req() req: any) {
    return this.movieService.create(body, req.user);
  }
}
