import { ApiProperty } from '@nestjs/swagger'

export class UserPresenter {
    @ApiProperty({ example: '2', description: 'Id of user' })
    id: string

    @ApiProperty({ example: 'example@mail.com', description: 'Email of user' })
    email?: string

    @ApiProperty({ example: '+79991112233', description: 'Phone number of user' })
    phone?: string

    @ApiProperty({ example: 'user', description: 'Name of user' })
    name?: string

    @ApiProperty({ example: '2023-09-12T21:05:00.000Z', description: 'Date of user creation' })
    createdAt: Date

    @ApiProperty({ example: '2023-09-12T21:05:00.000Z', description: 'Date of user update' })
    updatedAt: Date
}
