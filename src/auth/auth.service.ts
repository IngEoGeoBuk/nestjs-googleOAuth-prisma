import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async handleLogin(): Promise<{ msg: string }> {
    return { msg: 'Google Authentication' };
  }
  async handleRedirect(): Promise<{ msg: string }> {
    return { msg: 'OK' };
  }
  async validateUser(user: User): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (result) return user;
    const createUser = await this.prisma.user.create({
      data: user,
    });
    return createUser;
  }

  async findUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  getStatus(request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
