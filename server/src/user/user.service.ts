import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly pService: PrismaService) {}

  async userExsist(email: string): Promise<boolean> {
    const count = await this.pService.user.count({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });

    return count > 0;
  }

  async findUserByEmail(email: string) {
    return await this.pService.user.findFirst({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });
  }

  async createUser(user: Prisma.UserCreateInput) {
    return this.pService.user.create({
      data: user,
    });
  }

  async updateUser(userId: string, user: Prisma.UserUpdateInput) {
    return this.pService.user.update({
      where: {
        id: userId,
      },
      data: user,
    });
  }
}
