import { IsEmail, IsEnum, IsIn, IsString } from "class-validator";
import { UserRole } from "../entities/enum/userRole.enum";

export class CreateUserDto {
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    phoneNumber: string;
    
  
    @IsEnum(UserRole)
    userType: UserRole;

    @IsString()
    onboarding_status:string;
  }
  