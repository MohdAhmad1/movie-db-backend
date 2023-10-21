import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MovieService } from './movie.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

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

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateMovieById(
    @Param('id') movieId: string,
    @Body() body: UpdateMovieDTO,
    @Req() req: any,
  ) {
    return this.movieService.updateMovieById(movieId, body, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteMovieById(@Param('id') movieId: string, @Req() req: any) {
    return this.movieService.deleteMovieById(movieId, req.user);
  }
}
