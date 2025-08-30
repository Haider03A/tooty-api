import jwt from 'jsonwebtoken'
import { config } from '../config.js'

export const generateAccessToken = (userDate) => {
    return jwt.sign(
        userDate,
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
    )
}