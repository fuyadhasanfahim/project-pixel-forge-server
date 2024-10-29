import cloudinary from 'cloudinary'
import moment from 'moment'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.v2.config({
    cloud_name: 'dny7zfbg9',
    api_key: '851399194574513',
    api_secret: 'dpEHGE1DGM7qUdNQPLp7qVZ7_r0',
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        const { username, services } = req.body

        const folderName = Array.isArray(services)
            ? services
            : JSON.parse(services || '[]')

        const timestampFolder = moment().format('DD-MM-YYYY')

        return {
            folder: `${username}/${timestampFolder}/${folderName}`,
            public_id: `${file.originalname}`,
        }
    },
})

export const upload = multer({ storage })
