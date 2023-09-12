import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsPhoneNumber()
    phone?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string

    @IsOptional()
    @IsStrongPassword()
    password?: string
}
