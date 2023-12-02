import { MongooseModule } from '@nestjs/mongoose';
import { MorganModule } from 'nest-morgan';
import { Module } from '@nestjs/common';
import { UserSchema } from 'src/user/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { UserauthSchema } from './schemas/userauth.schema';
import { StudentStrategy } from './strategies/student.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MorganModule,
    MongooseModule.forFeature([{ name: 'Users', schema: UserauthSchema }]),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, StudentStrategy,UserService],
})
export class AuthModule {}
 