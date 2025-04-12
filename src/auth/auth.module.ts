import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: 'qwerty',
      signOptions: {
        expiresIn: '24 h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
