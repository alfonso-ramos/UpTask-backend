import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExist } from '../middleware/project';

const router = Router()

router.post('/',
    body('projectName')
        .notEmpty().withMessage('The project name is mandatory'),
    body('clientName')
        .notEmpty().withMessage('The name of the client is mandatory'),
    body('description')
        .notEmpty().withMessage('The description of the project is mandatory'),
    handleInputErrors,
    ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('The id is not valid'),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id',
    param('id').isMongoId().withMessage('The id is not valid'),
    body('projectName')
        .notEmpty().withMessage('The project name is mandatory'),
    body('clientName')
        .notEmpty().withMessage('The name of the client is mandatory'),
    body('description')
        .notEmpty().withMessage('The description of the project is mandatory'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id',
    param('id').isMongoId().withMessage('The id is not valid'),
    handleInputErrors,
    ProjectController.deleteProject
)

// Routes for tasks
router.post('/:projectId/tasks',
    validateProjectExist,
    TaskController.createTask
)

export default router