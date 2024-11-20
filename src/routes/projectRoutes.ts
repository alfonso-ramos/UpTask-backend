import { Router } from 'express';
import { body } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';

const router = Router()

router.post('/',
    body('projectName')
        .notEmpty().withMessage('The project name is mandatory'),
    body('clientName')
        .notEmpty().withMessage('The name of the client is mandatory'),
    body('description')
        .notEmpty().withMessage('The description of the project is mandatory'),
    handleInputErrors,
    ProjectController.createProject)

router.get('/', ProjectController.getAllProjects)

export default router