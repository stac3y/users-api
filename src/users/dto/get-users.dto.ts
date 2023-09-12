import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

import { SortEnum } from '../../common/enums/sort.enum'

export class GetUsersDto {
    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsNumber()
    offset?: number

    @IsOptional()
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsEnum(SortEnum)
    sort?: SortEnum
}
