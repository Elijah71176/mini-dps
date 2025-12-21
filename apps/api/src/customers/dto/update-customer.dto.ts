import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
