import { RequestHandler } from 'express'
import status from 'http-status'
import { UserService } from './user.service'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import httpStatus from 'http-status'
import { sendVerificationEmail } from '../../utils/emailService'

const createUser: RequestHandler = async (req, res) => {
    try {
        const { name, username, email, password, country, phone, company } =
            req.body

        if (
            !name ||
            !username ||
            !email ||
            !password ||
            !country ||
            !phone ||
            !company
        ) {
            res.status(status.BAD_REQUEST).json({
                success: false,
                message: 'Every input is required.',
            })
        }

        const data = {
            name,
            username,
            email,
            password,
            country,
            phone,
            company,
        }
        const user = await UserService.createUserIntoDB(data)

        if (!config.jwt_secret) {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'JWT secret is not defined.',
            })
        }

        const verificationToken = jwt.sign(
            { id: user._id },
            config.jwt_secret as string,
            {
                expiresIn: '1d',
            },
        )

        await sendVerificationEmail(email, verificationToken)

        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            config.jwt_secret as string,
            { expiresIn: '7d' },
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        })

        res.status(status.CREATED).json({
            success: true,
            message: 'User created successfully. Please verify your email.',
            user: { ...user.toObject(), emailVerificationToken: undefined },
            accessToken,
        })

        await user.save()
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
            error,
        })
    }
}

const loginUser: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(status.BAD_REQUEST).json({
                success: false,
                message: 'Every input is required.',
            })
        }

        const user = await UserService.loginUserFromDB({ email, password })

        if (!user.isVerified) {
            res.status(status.UNAUTHORIZED).json({
                success: false,
                message: 'Please verify your email before logging in.',
            })
        }

        if (!config.jwt_secret) {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'JWT secret is not defined.',
            })
        }

        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            config.jwt_secret as string,
            { expiresIn: '7d' },
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        })

        res.status(status.OK).json({
            success: true,
            message: 'User logged in successfully.',
            user: { ...user.toObject(), password: '' },
            accessToken,
        })
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
            error,
        })
    }
}

const getCurrentUser: RequestHandler = async (req, res) => {
    try {
        const token = req.cookies.accessToken
        if (!token) throw new Error('Access token not found')

        const decoded = jwt.verify(token, config.jwt_secret as string) as {
            id: string
        }

        const user = await UserService.getCurrentUserFromDB(decoded.id)

        if (!user) throw new Error('User not found')

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Current user retrieved successfully.',
            user,
        })
    } catch (error) {
        res.status(400).json({ message: (error as Error).message })
    }
}

const getUserByUserID: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await UserService.getUserById(userId)

        if (!user) throw new Error('User not found')

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Current user retrieved successfully.',
            user,
        })
    } catch (error) {
        res.status(400).json({ message: (error as Error).message })
    }
}

const verifyEmail: RequestHandler = async (req, res) => {
    const { token } = req.query

    try {
        const decoded = jwt.verify(
            token as string,
            config.jwt_secret as string,
        ) as JwtPayload
        const user = await UserService.getUserById(decoded.id)

        if (!user) {
            res.status(status.NOT_FOUND).json({
                success: false,
                message: 'User not found.',
            })
        }

        user.isVerified = true
        user.emailVerificationToken = null
        await user.save()

        res.status(status.OK).json({
            success: true,
            message: 'Email verified successfully!',
        })
    } catch (error) {
        res.status(status.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid or expired token.',
            error,
        })
    }
}

export const UserController = {
    createUser,
    loginUser,
    getCurrentUser,
    getUserByUserID,
    verifyEmail,
}
