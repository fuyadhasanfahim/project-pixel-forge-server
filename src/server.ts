import app from './app'
import mongoose from 'mongoose'
import config from './app/config'

const { port, database_url } = config

async function main() {
    await mongoose.connect(database_url as string)

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()
