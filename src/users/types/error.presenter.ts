import { ApiProperty } from '@nestjs/swagger'

export enum ErrorCode {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_PARAMETERS = 'INVALID_PARAMETERS',
    USER_WAS_NOT_SAVE = 'USER_WAS_NOT_SAVE',
}

export class ErrorPresenter {
    @ApiProperty({ enum: ErrorCode })
    code: ErrorCode

    @ApiProperty({ example: 'User not found' })
    message: string
}
