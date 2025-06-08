import { IsEmail, IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../entities/enum/userRole.enum";

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: "User's first name", example: "John" })
  firstName: string;

  @IsString()
  @ApiProperty({ description: "User's last name", example: "Doe" })
  lastName: string;

  @IsEmail()
  @ApiProperty({ description: "User's email address", example: "john.doe@example.com" })
  email: string;

  @IsString()
  @ApiProperty({ description: "User's phone number", example: "+1234567890" })
  phoneNumber: string;

  @IsEnum(UserRole)
  @ApiProperty({ 
    description: "User role type", 
    enum: UserRole, 
    example: UserRole.Branch 
  })
  userType: UserRole;

  @IsString()
  onboarding_status: string;
}
