import { USER_REPOSITORY } from '../common/constants'

import { User } from './entities/user.entity'

export const usersProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: User,
    },
]
