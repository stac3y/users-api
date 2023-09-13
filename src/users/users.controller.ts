import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

import { SortEnum } from '../common/enums/sort.enum'

import { CreateUserDto, UpdateUserDto } from './dto'
import { UserDto } from './dto'
import { ErrorPresenter } from './types/error.presenter'
import { UserPresenter } from './types/user.presenter'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiOperation({
        summary: 'Create user',
    })
    @ApiResponse({ status: 200, type: UserPresenter })
    @ApiResponse({ status: 400, type: ErrorPresenter })
    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
        return await this.userService.createUser(dto)
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
        return await this.userService.getUsers({ email, phone, name, offset, limit, sort })
    }

    @ApiOperation({
        summary: 'Get user by id',
    })
    @ApiResponse({ status: 200, type: UserPresenter })
    @ApiResponse({ status: 404, type: ErrorPresenter })
    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<UserDto> {
        return await this.userService.getUserById(userId)
    }

    @ApiOperation({
        summary: 'Update user by id',
    })
    @ApiResponse({ status: 200, type: UserPresenter })
    @ApiResponse({ status: 404, type: ErrorPresenter })
    @Put(':userId')
    async updateUser(@Param('userId') userId: string, @Body() dto: UpdateUserDto): Promise<UserDto> {
        return await this.userService.updateUser(userId, dto)
    }

    @ApiOperation({
        summary: 'Delete user by id',
    })
    @ApiResponse({ status: 200, type: Boolean })
    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string): Promise<boolean> {
        return await this.userService.deleteUser(userId)
    }
}
