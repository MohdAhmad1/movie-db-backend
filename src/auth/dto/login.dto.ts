import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
});

export class LoginDTO extends createZodDto(loginSchema) {}
