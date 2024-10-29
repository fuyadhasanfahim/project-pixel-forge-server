import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
    path: path.join(process.cwd(), '.env'),
})

export default {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_secret: process.env.JWT_SECRET,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    base_url: process.env.BASE_URL,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
}
