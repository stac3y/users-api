import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { Op } from 'sequelize'

import { USER_REPOSITORY } from '../common/constants'
import { SortEnum } from '../common/enums/sort.enum'

import { CreateUserDto, GetUsersDto, UpdateUserDto, UserDto } from './dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly _userRepository: typeof User) {}
    async createUser(dto: CreateUserDto): Promise<UserDto> {
        const { email, phone, password } = dto
        if (!email && !phone) {
            throw new BadRequestException('Email or phone must be defined')
        }

        const hashedPassword = await this._hashPassword(password)
        return await this._userRepository.create<User>({ ...dto, password: hashedPassword })
    }

    async getUserById(userId: string): Promise<UserDto> {
        const user = await this._userRepository.findOne<User>({ where: { id: userId, deletedAt: null } })

        if (!user) {
            throw new NotFoundException('User not found!')
        }

        return user
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

        return await this._userRepository.findAll<User>({
            where: {
                [Op.and]: [...query],
            },
            limit: limit ?? 20,
            offset: offset ?? 0,
            order: [['id', sort ?? SortEnum.DESC]],
        })
    }

    async updateUser(userId: string, dto: UpdateUserDto): Promise<UserDto> {
        const { password } = dto

        if (password) {
            dto.password = await this._hashPassword(password)
        }

        const [affectedCount] = await this._userRepository.update<User>(dto, { where: { id: userId, deletedAt: null } })
        if (!affectedCount) {
            throw new NotFoundException('User not found!')
        }

        return await this.getUserById(userId)
    }

    async deleteUser(userId: string): Promise<boolean> {
        const result = await this._userRepository.destroy<User>({ where: { id: userId } })
        return !!result
    }

    private async _hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }

    private async _comparePassword(enteredPassword: string, dbPassword: string): Promise<boolean> {
        const match = await bcrypt.compare(enteredPassword, dbPassword)
        return match
    }
}
