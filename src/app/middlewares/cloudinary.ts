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
        const { username } = req.body

        const timestampFolder = moment().format('DD-MM-YYYY')
        const hourFolder = moment().format('HH')

        return {
            folder: `${username}/${timestampFolder}/${hourFolder}`,
            public_id: `${file.originalname}`,
            resource_type: 'auto',
        }
    },
})

export const upload = multer({ storage })
