import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator'

export class UpdateUserDto {
    @ApiProperty({ required: false, example: 'example@mail.com' })
    @IsOptional()
    @IsEmail()
    email?: string

    @ApiProperty({ required: false, example: '+79991112233' })
    @IsOptional()
    @IsPhoneNumber()
    phone?: string

    @ApiProperty({ required: false, example: 'user' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string

    @ApiProperty({ required: false, example: 'Abc123!?' })
    @IsOptional()
    @IsStrongPassword()
    password?: string
}
