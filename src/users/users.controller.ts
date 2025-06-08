import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { UpdateOnboardingDto } from './dtos/update-onboarding.dto';
import { CreateUserDto } from './dtos/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      console.log('Error creating user:', error);
      throw new BadRequestException(error.message);
    }
  }


  @Post(':userId/onboarding')
  async updateOnboardingDetails(
    @Param('userId') userId: string,
    @Body() updateOnboardingDto: UpdateOnboardingDto,
  ) {
    try {
      const updated = await this.userService.updateOnboardingDetails(
        userId,
        updateOnboardingDto,
      );
      return {
        message: 'Onboarding updated',
        onboardingDetails: updated,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }





}
