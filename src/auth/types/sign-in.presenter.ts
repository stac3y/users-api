import { ApiProperty } from '@nestjs/swagger'

export class SignInPresenter {
    @ApiProperty({ description: 'Access token for user authorization' })
    accessToken: string
}
