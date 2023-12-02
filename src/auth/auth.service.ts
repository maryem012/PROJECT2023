import { Body, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/enum/role.enum';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { Userauth } from './interfaces/userauth.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthService {
    constructor(
      @InjectModel('Users') private authModel: Model<Userauth>,
      private jwtService: JwtService,
      private usersService: UserService,
    ) {}
  
    /**
     *
     * @param user
     * @returns
     */
    async signIn(user: Userauth) {
      const payload = {
        email: user.email,
        sub: user._id,
      };
      // eslint-disable-next-line prettier/prettier
      const findUser = await this.usersService.getUserByEmail(user.email)
      console.log(findUser);
  
      if (!findUser) {
        return ("email invalide")
        };
        const valid = await bcrypt.compare( user.password,findUser.password);
        console.log(valid);
  
      if (findUser&&valid) {
        return {
          user: findUser,
          accessToken: this.jwtService.sign(payload),
        };
      } return  ("user invalide")
  
      console.log(user);

    }
    
  //to be corriged
    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.usersService.getUserByEmail(email);
      const valid = await bcrypt.compare(pass, user.password);
      if (!user ) {
        return null;
      }
     
      
      console.log(valid);
      if (valid&& user) {
        return user;
      }
  
      return null;
    }
  
    async signUp(res, @Body() body: AuthCredentialsDto) {
      body.email = body.email.toLowerCase().trim();
      body.email = body.email.toLowerCase().trim();
      const user = body;
      user.password = await bcrypt.hash(body.password, 10);
      user.role = Role.Student;
      const userByEmail = await this.usersService.getUserByEmail(
        user.email,
      );
      if (userByEmail) {
        return res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          cause: 'EMAIL',
          error: 'EMail exist.',
        });
      }
  
      const fuserByEmail = await this.usersService.getUserByEmail(body.email);
  
      if (fuserByEmail) {
        return res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          cause: 'EMAIL',
          error: 'Email exist.',
        });
      }
  
      if (!body.email || !body.password) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Email and password are required.',
        });
      }
  
      const userData = new this.authModel({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        birthdate: user.birthdate,
      
        phone: user.phone ,
      
        role: user.role,
      });
      userData.save();
  
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          birthdate: userData.birthdate,
        
          phone: userData.phone,
          role: userData.role,
  
        },
      });
    }
  
    async getAuthUser(@Req() req) {
      const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      const payload: any = this.jwtService.decode(jwtFromRequest, {});
      const user= this.usersService.getUserByEmail(payload.email);
      console.log('payload', payload);
     if (!payload) {
        return null;
      }
      return user;  
    }
  
    async validateJwtUser(payload: {id:string,email:string}) {
      return this.usersService.getUserByEmail( payload.email );
    }
  
    async signUpAdmin(res, @Body() body:   AuthCredentialsDto) {
      body.email = body.email.toLowerCase().trim();
      body.email = body.email.toLowerCase().trim();
      const user = body;
      user.password = await bcrypt.hash(body.password, 10);
      user.role = Role.Admin;
      const fuserByEmail = await this.usersService.getUserByEmail(
        user.email,
      );
      if (fuserByEmail) {
        return res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          cause: 'Email',
          error: 'email exist.',
        });
      }
  
      const userByEmail = await this.usersService.getUserByEmail(body.email);
  
      if (userByEmail) {
        return res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          cause: 'EMAIL',
          error: 'Email exist.',
        });
      }
  
      if (!body.email || !body.password) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Email and password are required.',
        });
      }
  
      const userData = new this.authModel({
        email:user.email,
        password: user.password,
        role: user.role,
      });
      userData.save();
  
  
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          id: userData.id,
          email:userData.email,
          role: userData.role,
  
        },
      });
    }
   

  }
  
