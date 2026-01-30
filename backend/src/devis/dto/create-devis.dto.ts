import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateDevisDto {
  @IsString()
  companyName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  numberOfEmployees?: string;

  @IsString()
  @IsOptional()
  trainingType?: string;

  @IsString()
  @IsOptional()
  message?: string;
}


