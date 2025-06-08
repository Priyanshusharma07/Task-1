import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserType } from './entities/user-type.entity';
import { UserOnboardingDetails } from './entities/user-onboarding-details.entity';
import { OnboardingStatus } from './entities/onbording.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([User, UserType, UserOnboardingDetails, OnboardingStatus]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UserModule], // only if needed outside this module
})
export class UserModule { }
