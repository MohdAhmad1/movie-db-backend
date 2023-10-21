import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createActorSchema = z.object({
  name: z.string(),
});

export class CreateActorDTO extends createZodDto(createActorSchema) {}
