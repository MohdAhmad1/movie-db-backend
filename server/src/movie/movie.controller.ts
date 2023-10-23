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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  findAll(@Req() req: any) {
    return this.movieService.findAll(req.user);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  create(@Body() body: CreateMovieDTO, @Req() req: any) {
    return this.movieService.create(body, req.user);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  updateMovieById(
    @Param('id') movieId: string,
    @Body() body: UpdateMovieDTO,
    @Req() req: any,
  ) {
    return this.movieService.updateMovieById(movieId, body, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  deleteMovieById(@Param('id') movieId: string, @Req() req: any) {
    return this.movieService.deleteMovieById(movieId, req.user);
  }
}
