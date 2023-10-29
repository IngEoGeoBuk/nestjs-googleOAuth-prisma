import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin(): Promise<{ msg: string }> {
    return this.authService.handleLogin();
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(): Promise<{ msg: string }> {
    return this.authService.handleRedirect();
  }

  @Get('status')
  user(@Req() request: Request) {
    return this.authService.getStatus(request);
  }
}
