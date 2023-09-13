import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { ErrorCode } from '../common/types/error.presenter'
import { UsersService } from '../users/users.service'

import { SignInDto, AccessTokenDto } from './dto'

@Injectable()
export class AuthService {
    constructor(private readonly _usersService: UsersService, private readonly _jwtService: JwtService) {}
    async signIn(dto: SignInDto): Promise<AccessTokenDto> {
        const { email, phone, password } = dto
        if (!email && !phone) {
            throw new BadRequestException({
                code: ErrorCode.INVALID_PARAMETERS,
                message: 'Email or phone must be defined',
            })
        }

        const { password: dbPassword, id } = await this._usersService.getUserForSignIn(dto)
        const isPasswordCorrect = await this._comparePassword(password, dbPassword)

        if (!isPasswordCorrect) {
            throw new UnauthorizedException({
                code: ErrorCode.WRONG_PASSWORD,
                message: 'Password is not correct',
            })
        }

        const payload = { sub: id }
        return {
            accessToken: await this._jwtService.signAsync({ ...payload }),
        }
    }

    private async _comparePassword(enteredPassword: string, dbPassword: string): Promise<boolean> {
        const match = await bcrypt.compare(enteredPassword, dbPassword)
        return match
    }
}
