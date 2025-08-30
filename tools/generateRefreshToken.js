import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../config.js'

const jti = uuidv4();

export const generateRefreshToken = (userDate) => {
    return jwt.sign(
        userDate,
        config.refreshSecret,
        {
            expiresIn: config.refreshExpiresIn,
            jwtid: jti
        }
    )
}