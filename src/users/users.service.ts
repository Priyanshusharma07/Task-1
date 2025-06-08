import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './entities/user-type.entity';
import { UserOnboardingDetails } from './entities/user-onboarding-details.entity';
import { OnboardingStatus } from './entities/onbording.entity';
import { CreateUserDto } from './dtos/user-create.dto';
import { UpdateOnboardingDto } from './dtos/update-onboarding.dto';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { generate8CharHexPassword } from './utility/utility_fuc';
import { STATUS_CODES } from 'http';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserType)
    private readonly userTypeRepo: Repository<UserType>,

    @InjectRepository(UserOnboardingDetails)
    private readonly onboardingRepo: Repository<UserOnboardingDetails>,

    @InjectRepository(OnboardingStatus)
    private readonly onboardingStatusRepo: Repository<OnboardingStatus>,
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const { userType, email, ...rest } = createUserDto;

    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException({
        success: false,
        message: `User with email '${email}' already exists`,
        errorCode: 'USER_ALREADY_EXISTS', // optional, for frontend handling
      });
    }

    const userTypeEntity = await this.userTypeRepo.findOne({
      where: { type: userType },
    });

    if (!userTypeEntity) {
      throw new NotFoundException({
        success: false,
        errorCode: 'USER_TYPE_NOT_FOUND',
        message: `UserType '${userType}' not found`,
      });
    }

    //  Generate a random password
    const rawPassword = await generate8CharHexPassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 8);


    // Create and save user
    const user = this.userRepo.create({
      ...rest,
      password: hashedPassword,
      email,
      userType: userTypeEntity,
    });

    await this.userRepo.save(user);

    return {
      success: true,
      message: 'User created successfully',
      data: {
        id: user.id,
        email: user.email,
        userType: user.userType.type,
      }
    };
  }



  async updateOnboardingDetails(
    userId: string,
    dto: UpdateOnboardingDto,
  ) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['onboardingDetails', 'onboardingDetails.status'],
    });

    if (!user) {
      throw new NotFoundException({
        success: false,
        errorCode: 'USER_NOT_FOUND',
        message: `User not found`,
      });
    }

    if (!user.onboardingDetails) {
      user.onboardingDetails = this.onboardingRepo.create({ user });
    }

    Object.assign(user.onboardingDetails, dto);

    const requiredFields = [
      'addressLine1',
      'province',
      'sinNumber',
      'branch',
      'licenseNumber',
      'companyName',
    ];

    const allFilled = requiredFields.every((field) => dto[field]);

    if (allFilled) {
      const completedStatus = 'COMPLETED';
      user.onboarding_status = completedStatus;
      await this.userRepo.save(user);
    }
    
    const savedDetails = await this.onboardingRepo.save(user.onboardingDetails);

    return {
      success: true,
      message: 'Onboarding details saved successfully',
      data: savedDetails,
    };
  }

}
