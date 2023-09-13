import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class SignInDto {
    @ApiProperty({ required: false, example: 'example@mail.com' })
    @IsOptional()
    @IsEmail()
    email?: string

    @ApiProperty({ required: false, example: '+79991112233' })
    @IsOptional()
    @IsPhoneNumber()
    phone?: string

    @ApiProperty({ required: true, example: 'Abc123!?' })
    @IsString()
    @IsNotEmpty()
    password: string
}
