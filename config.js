import dotenv from 'dotenv'
import { mongo } from 'mongoose'

dotenv.config()

export const config = {
    port: process.env.PORT,
    dbConnectionString: process.env.DB_CONECTION_STRING,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,
    cookieExpiration: process.env.COOKIE_EXPIRATION,
    mongoDbName: process.env.MONGO_DB_NAME


}