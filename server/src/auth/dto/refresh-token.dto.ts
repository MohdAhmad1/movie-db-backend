import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const refreshTokenSchema = z.object({
  refresh_token: z.string().min(1, 'refresh token is required'),
});

export class RefreshTokenDTO extends createZodDto(refreshTokenSchema) {}
