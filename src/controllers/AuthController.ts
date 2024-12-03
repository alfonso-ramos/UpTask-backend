import type {Request, Response} from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'

export class AuthController {
    static createAccount = async (req : Request, res : Response): Promise<void> => {
        try {

            const { password, email } = req.body
            
            //Avoid duplicates
            const userExist = await User.findOne({email})
            if(userExist){
                const error = new Error('This user has been registered')
                res.status(409).json({error: error.message})
            }

            // Create an user
            const user = new User(req.body)

            // Hash password
            user.password = await hashPassword(password)

            //Generate token 
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            await Promise.allSettled([user.save(), token.save()])
            
            res.send('Your account has been registered, check your email for verification')
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
    }
}