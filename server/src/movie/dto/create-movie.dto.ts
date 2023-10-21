import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createMovieSchema = z.object({
  name: z.string().min(1),
  rating: z.number(),
  genre: z.string().uuid(),
  casts: z.array(z.string().uuid()).min(1),
  releaseDate: z.string().datetime(),
});

export class CreateMovieDTO extends createZodDto(createMovieSchema) {}
