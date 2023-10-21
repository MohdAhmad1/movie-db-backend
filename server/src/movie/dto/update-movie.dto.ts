import { createZodDto } from 'nestjs-zod';
import { createMovieSchema } from './create-movie.dto';

const updateMovieSchema = createMovieSchema.partial();

export class UpdateMovieDTO extends createZodDto(updateMovieSchema) {}
