import { Schema } from 'mongoose'
import IUser from './user.interface'
import crypto from 'crypto'

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        company: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        country: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: { type: String, default: null },
        role: {
            type: String,
            enum: [
                'user',
                'admin',
                'superAdmin',
                'teamManager',
                'accountant',
                'teamLeader',
            ],
            required: false,
            default: 'user',
        },
        isActive: {
            type: String,
            enum: ['active', 'inactive', 'blocked'],
            default: 'active',
        },
        profileImage: {
            type: String,
            default: function () {
                const emailHash = crypto
                    .createHash('md5')
                    .update(this.email.trim().toLowerCase())
                    .digest('hex')
                return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`
            },
        },
    },
    {
        timestamps: true,
    },
)

export default UserSchema
