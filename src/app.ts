import express, { Application } from 'express'
import cors from 'cors'
import router from './app/routes'
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(cookieParser())
app.use(express.json())

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
)

app.use('/api/v1', router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app
