import { IsStrongPassword } from 'class-validator'

import { UpdateUserDto } from './update-user.dto'

export class CreateUserDto extends UpdateUserDto {
    @IsStrongPassword()
    password: string
}
