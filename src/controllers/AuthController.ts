import type {Request, Response} from 'express'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'

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

            // Send email
            AuthEmail.sendConfimationEmail({
                email: user.email,
                name: user.name,
                token: token.token

            })

            await Promise.allSettled([user.save(), token.save()])

            res.send('Your account has been registered, check your email for verification')
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
    }

    static confirmAccount = async (req : Request, res : Response): Promise<void> =>{
        try {
            const {token} = req.body

            const tokenExist = await Token.findOne({token})
            if(!tokenExist){
                const error = new Error('Invalid token')
                res.status(404).json({error: error.message})
                return
            }

            const user = await User.findById(tokenExist.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.send('Your account has been confirmed')
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
    }

    static login = async (req : Request, res : Response): Promise<void> =>{
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                const error = new Error('User not found')
                res.status(404).json({error: error.message})
                return
            }
            if(!user.confirmed){
                const token = new Token()
                token.user = user.id
                token.token = generateToken()
                await token.save()

                 // Send email
                AuthEmail.sendConfimationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token

                })

                const error = new Error("The account has not be confirmed, we have send you a email with your auth token")
                res.status(401).json({error: error.message})
                return
            }

            // check password
            const isPasswordCorrect = await checkPassword(password, user.password)
            if(!isPasswordCorrect){
                const error = new Error("The password is incorrect")
                res.status(401).json({error: error.message})
                return
            }
            
            res.send("Authenticated")
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
    }

    static requestConfirmationCode = async (req : Request, res : Response): Promise<void> => {
        try {

            const { email } = req.body
            
            // user exist
            const user = await User.findOne({email})
            if(!user){
                const error = new Error('This user has not been registered')
                res.status(409).json({error: error.message})
                return
            }
            if(user.confirmed){
                const error = new Error('The user has been confirmed')
                res.status(403).json({error: error.message})
                return
            }

            //Generate token 
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // Send email
            AuthEmail.sendConfimationEmail({
                email: user.email,
                name: user.name,
                token: token.token

            })

            await Promise.allSettled([user.save(), token.save()])

            res.send('A new token has been sent to your email')
        } catch (error) {
            res.status(500).json({error: 'Error'})
            return
        }
    }
}