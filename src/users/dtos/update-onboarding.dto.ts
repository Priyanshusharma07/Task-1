import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateOnboardingDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: "First line of the address", example: "123 Main St" })
  addressLine1?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: "Province or state", example: "Ontario" })
  province?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: "Social Insurance Number (SIN)", example: "123-456-789" })
  sinNumber?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: "Branch name or code", example: "Branch A" })
  branch?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: "License number", example: "LIC-123456" })
  licenseNumber?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: "Company name", example: "Tech Solutions Inc." })
  companyName?: string;
}
