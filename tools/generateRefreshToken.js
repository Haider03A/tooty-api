import jwt from 'jsonwebtoken'
import { config } from '../config.js'

export const generateRefreshToken = (userDate) => {
    return jwt.sign(
        userDate,
        config.refreshSecret,
        { expiresIn: config.refreshExpiresIn }
    )
}