import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('The name cannot be empty'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Passwords are not the same')
        }
        return true
    }),
    body('email')
        .isEmail().withMessage('The email is not valid')
        .notEmpty().withMessage('The email cannot be empty'),
    handleInputErrors,
    AuthController.createAccount
)

export default router