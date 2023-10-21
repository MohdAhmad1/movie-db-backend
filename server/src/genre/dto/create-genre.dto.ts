import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createGenreSchema = z.object({
  name: z.string().transform((name) => name.toLowerCase()),
});

export class CreateGenreDTO extends createZodDto(createGenreSchema) {}
