import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UpdateOnboardingDto } from './dtos/update-onboarding.dto';
import { CreateUserDto } from './dtos/user-create.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@ApiTags('Users') // Groups endpoints under "Users" tag in Swagger UI
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      console.log('Error creating user:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Post(':userId/onboarding')
  @ApiOperation({ summary: 'Update onboarding details for a user' })
  @ApiParam({ name: 'userId', description: 'UUID of the user' })
  @ApiBody({ type: UpdateOnboardingDto })
  @ApiResponse({ status: 200, description: 'Onboarding updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request / User not found / Validation Error' })
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

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [User] })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
