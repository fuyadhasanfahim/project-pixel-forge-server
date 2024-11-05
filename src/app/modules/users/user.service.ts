import config from '../../config'
import UserModel from './user.model'
import bcrypt from 'bcrypt'

const { bcrypt_salt_rounds } = config

interface CreateUserProps {
    name: string
    username: string
    email: string
    password: string
    company: string
    country: string
    phone: string
    role?: string
}

const createUserIntoDB = async ({
    name,
    username,
    email,
    password,
    company,
    country,
    phone,
    role,
}: CreateUserProps) => {
    const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }, { phone }],
    })

    if (existingUser) {
        if (existingUser.email === email) {
            throw new Error('This email is already in use.')
        }
        if (existingUser.username === username) {
            throw new Error('This username is already in use.')
        }
        if (existingUser.phone === phone) {
            throw new Error('This phone number is already in use.')
        }
    }

    const salt = await bcrypt.genSalt(Number(bcrypt_salt_rounds))
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new UserModel({
        name,
        username,
        email,
        phone,
        company,
        country,
        role,
        password: hashedPassword,
    })

    await user.save()

    return user
}

const loginUserFromDB = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    const user = await UserModel.findOne({ email })

    if (!user) {
        throw new Error('User with this email does not exist.')
    }

    if (!user.isVerified) {
        throw new Error(
            'Email is not verified. First verify your email to login.',
        )
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new Error('Invalid password.')
    }

    return user
}

const getCurrentUserFromDB = async (id: string) => {
    const user = await UserModel.findById(id).select('-password')

    if (!user) throw new Error('User not found')

    return user
}

const getUserById = async (id: string) => {
    const user = await UserModel.findById(id)
    if (!user) throw new Error('User not found')
    return user
}

const getAllUsers = async () => {
    try {
        const users = await UserModel.find()
        return users
    } catch {
        throw new Error('Users not found')
    }
}

export const UserService = {
    createUserIntoDB,
    loginUserFromDB,
    getCurrentUserFromDB,
    getUserById,
    getAllUsers,
}
