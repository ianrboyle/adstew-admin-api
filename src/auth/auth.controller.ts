import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './users/dto/user.dto';
import { User } from './users/entities/user.entity';
import { CurrentUser } from '../decorators';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    const userDto: UserDto = {
      id: user.id,
      email: user.email,
    };
    response.send({ user: userDto, jwt: jwt });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    response.send({ message: 'Logout successful' });
  }
}
