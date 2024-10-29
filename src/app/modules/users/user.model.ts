import { model } from 'mongoose'
import IUser from './user.interface'
import UserSchema from './user.schema'

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
