import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception'
import * as bcrypt from 'bcrypt'
import { Op } from 'sequelize'

import { SignInDto } from '../auth/dto'
import { USER_REPOSITORY } from '../common/constants'
import { SortEnum } from '../common/enums/sort.enum'
import { ErrorCode } from '../common/types/error.presenter'

import { CreateUserDto, GetUsersDto, UpdateUserDto, UserDto } from './dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly _userRepository: typeof User) {}
    async createUser(dto: CreateUserDto): Promise<UserDto> {
        const { email, phone, password } = dto
        if (!email && !phone) {
            throw new BadRequestException({
                code: ErrorCode.INVALID_PARAMETERS,
                message: 'Email or phone must be defined',
            })
        }

        const hashedPassword = await this._hashPassword(password)
        try {
            const user = await this._userRepository.create<User>({ ...dto, password: hashedPassword })
            return new UserDto(user)
        } catch (err) {
            throw new InternalServerErrorException({
                code: ErrorCode.USER_WAS_NOT_SAVE,
                message: `User wasn't save. Probably the phone number or email is not unique`,
            })
        }
    }

    async getUserById(userId: string): Promise<UserDto> {
        const user = await this._userRepository.findOne<User>({ where: { id: userId, deletedAt: null } })

        if (!user) {
            throw new NotFoundException({ code: ErrorCode.USER_NOT_FOUND, message: 'User not found' })
        }

        return new UserDto(user)
    }

    async getUsers(dto: GetUsersDto): Promise<UserDto[]> {
        const { email, name, phone, offset, limit, sort } = dto
        const query = []
        query.push({ deletedAt: null })

        if (email) {
            query.push({ email })
        }

        if (name) {
            query.push({ name })
        }

        if (phone) {
            query.push({ phone })
        }

        const users = await this._userRepository.findAll<User>({
            where: {
                [Op.and]: [...query],
            },
            limit: limit ?? 20,
            offset: offset ?? 0,
            order: [['id', sort ?? SortEnum.DESC]],
        })

        return users.map(user => new UserDto(user))
    }

    async getUserForSignIn(dto: SignInDto): Promise<User> {
        const { email, phone } = dto
        const query = []
        query.push({ deletedAt: null })

        if (email) {
            query.push({ email })
        }

        if (phone) {
            query.push({ phone })
        }

        const user = await this._userRepository.findOne<User>({
            where: {
                [Op.and]: [...query],
            },
        })

        if (!user) {
            throw new NotFoundException({ code: ErrorCode.USER_NOT_FOUND, message: 'User not found' })
        }

        return user
    }

    async updateUser(userId: string, dto: UpdateUserDto, currentUserId: string): Promise<UserDto> {
        if (userId !== currentUserId) {
            throw new ForbiddenException({ code: ErrorCode.FORBIDDEN, message: 'User can update only his own data' })
        }

        const { password } = dto

        if (password) {
            dto.password = await this._hashPassword(password)
        }

        let updatedCount: number

        try {
            const [affectedCount] = await this._userRepository.update<User>(dto, {
                where: { id: userId, deletedAt: null },
            })
            updatedCount = affectedCount
        } catch (err) {
            throw new InternalServerErrorException({
                code: ErrorCode.USER_WAS_NOT_SAVE,
                message: `User wasn't save. Probably the phone number or email is not unique`,
            })
        }

        if (!updatedCount) {
            throw new NotFoundException({ code: ErrorCode.USER_NOT_FOUND, message: 'User not found' })
        }

        return await this.getUserById(userId)
    }

    async deleteUser(userId: string, currentUserId: string): Promise<boolean> {
        if (userId !== currentUserId) {
            throw new ForbiddenException({ code: ErrorCode.FORBIDDEN, message: 'User can delete only his own data' })
        }

        const result = await this._userRepository.destroy<User>({ where: { id: userId } })
        return !!result
    }

    private async _hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }
}
