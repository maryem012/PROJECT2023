import { Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Role } from 'src/enum/role.enum';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController  { 
    constructor(private userauthService: AuthService) {}

@ApiCreatedResponse({ type: AuthCredentialsDto })
@Post('signup')
async signUp(
  @Res() res,
  @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
): Promise<void> {
  return await this.userauthService.signUp(res, authCredentialsDto);
}

@Post('signAdmin')
async signUpAdmin(
  @Res() res,
  @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
): Promise<void> {
  return await this.userauthService.signUpAdmin(res, authCredentialsDto);
}


@ApiCreatedResponse({ type: AuthCredentialsDto })
@Post('signin')
async signIn(@Res() res, @Body() body) {
  const user = await this.userauthService.signIn(body);
  return res.status(200).json({
    code: 200,
    result: user,
  });
}

@UseGuards(AuthGuard(Role.Student))
@Get('test')
async getTest(@Res() res, @Req() req) {
  const userAuth = await this.userauthService.getAuthUser(req);
  console.log('getTest userAuth', userAuth);
  return res.status(200).json({
    result: userAuth,
  });
}

@UseGuards(JwtAuthGuard)
@Get('me')
getMe(@Req() req) {
  return req.user;
}
}

