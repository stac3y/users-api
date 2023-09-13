export class UserDto {
    constructor(payload: UserDto) {
        this.id = payload.id
        this.email = payload.email
        this.phone = payload.phone
        this.name = payload.name
        this.createdAt = payload.createdAt
        this.updatedAt = payload.updatedAt
    }
    id: string
    email?: string
    phone?: string
    name?: string
    createdAt: Date
    updatedAt: Date
}
