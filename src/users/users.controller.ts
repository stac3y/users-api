import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

import { SortEnum } from '../common/enums/sort.enum'
import { ErrorPresenter } from '../common/types/error.presenter'

import { CreateUserDto, UpdateUserDto } from './dto'
import { UserDto } from './dto'
import { UserPresenter } from './types/user.presenter'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('/users')
export class UsersController {
    constructor(private readonly _userService: UsersService) {}

    @ApiOperation({
        summary: 'Create user',
    })
    @ApiResponse({ status: 200, type: UserPresenter })
    @ApiResponse({ status: 400, type: ErrorPresenter })
    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
        return await this._userService.createUser(dto)
    }

    @ApiOperation({
        summary: 'Get list of users with filter and pagination',
    })
    @ApiQuery({ name: 'email', required: false, example: 'example@mail.com' })
    @ApiQuery({ name: 'phone', required: false, example: '+79991112233' })
    @ApiQuery({ name: 'name', required: false, example: 'user' })
    @ApiQuery({ name: 'offset', required: false, example: 5 })
    @ApiQuery({ name: 'limit', required: false, example: 20 })
    @ApiQuery({ name: 'sort', required: false, enum: SortEnum })
    @ApiResponse({ status: 200, type: UserPresenter, isArray: true })
    @Get()
    async getUsers(
        @Query('email') email?: string,
        @Query('phone') phone?: string,
        @Query('name') name?: string,
        @Query('offset') offset?: number,
        @Query('limit') limit?: number,
        @Query('sort') sort?: SortEnum,
    ): Promise<UserDto[]> {
        return await this._userService.getUsers({ email, phone, name, offset, limit, sort })
    }

    @ApiOperation({
        summary: 'Get user by id',
    })
    @ApiResponse({ status: 200, type: UserPresenter })
    @ApiResponse({ status: 404, type: ErrorPresenter })
    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<UserDto> {
        return await this._userService.getUserById(userId)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Update user by id',
    })
    @ApiResponse({ status: 200, type: UserPresenter })
    @ApiResponse({ status: 403, type: ErrorPresenter })
    @ApiResponse({ status: 404, type: ErrorPresenter })
    @Put(':userId')
    async updateUser(@Param('userId') userId: string, @Body() dto: UpdateUserDto, @Request() req): Promise<UserDto> {
        return await this._userService.updateUser(userId, dto, req.user.sub.toString())
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Delete user by id',
    })
    @ApiResponse({ status: 200, type: Boolean })
    @ApiResponse({ status: 403, type: ErrorPresenter })
    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string, @Request() req): Promise<boolean> {
        return await this._userService.deleteUser(userId, req.user.sub.toString())
    }
}
