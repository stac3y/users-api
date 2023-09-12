import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { CreateUserDto, GetUsersDto, UpdateUserDto } from './dto'
import { UserDto } from './dto'
import { UsersService } from './users.service'

@Controller('/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
        return await this.userService.createUser(dto)
    }

    @Get()
    async getUsers(@Body() dto: GetUsersDto): Promise<UserDto[]> {
        return await this.userService.getUsers(dto)
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<UserDto> {
        return await this.userService.getUserById(userId)
    }

    @Put(':userId')
    async updateUser(@Param('userId') userId: string, @Body() dto: UpdateUserDto): Promise<UserDto> {
        return await this.userService.updateUser(userId, dto)
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string): Promise<boolean> {
        return await this.userService.deleteUser(userId)
    }
}
