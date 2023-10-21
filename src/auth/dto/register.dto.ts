import { z } from 'zod';
import { loginSchema } from './login.dto';
import { createZodDto } from 'nestjs-zod';

const registerSchema = loginSchema.extend({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must contain minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character',
    ),
});

export class RegisterDTO extends createZodDto(registerSchema) {}
