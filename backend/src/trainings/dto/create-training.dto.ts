import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTrainingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  level?: string;

  @IsString()
  @IsOptional()
  instructor?: string;

  @IsString()
  @IsOptional()
  instructorName?: string;

  @IsString()
  @IsOptional()
  instructorTitle?: string;

  @IsString()
  @IsOptional()
  instructorDescription?: string;

  @IsString()
  @IsOptional()
  instructorPhoto?: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  hours: number;

  @IsString()
  @IsOptional()
  program?: string;

  @IsOptional()
  modules?: Array<{
    moduleName: string;
    topics: string[];
  }>;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value) || 0)
  @IsOptional()
  discount?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  days?: string;

  @IsString()
  @IsOptional()
  time?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  maxParticipants?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;
}

