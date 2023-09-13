import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ErrorPresenter } from '../common/types/error.presenter'

import { AuthService } from './auth.service'
import { SignInDto } from './dto'
import { AccessTokenDto } from './dto'
import { SignInPresenter } from './types/sign-in.presenter'

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @ApiOperation({
        summary: 'User authorization',
        description: 'User should send email or phone and password for authorization. Returns access token.',
    })
    @ApiResponse({ status: 200, type: SignInPresenter })
    @ApiResponse({ status: 400, type: ErrorPresenter })
    @ApiResponse({ status: 401, type: ErrorPresenter })
    @ApiResponse({ status: 404, type: ErrorPresenter })
    @Post('/login')
    async createUser(@Body() dto: SignInDto): Promise<AccessTokenDto> {
        return await this._authService.signIn(dto)
    }
}
