import { ApiProperty } from '@nestjs/swagger'
import { IsStrongPassword } from 'class-validator'

import { UpdateUserDto } from './update-user.dto'

export class CreateUserDto extends UpdateUserDto {
    @ApiProperty({ required: true, example: 'Abc123!?' })
    @IsStrongPassword()
    password: string
}
