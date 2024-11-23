import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { projectExist } from '../middleware/project';
import { taskBelongsToProject, taskExist } from '../middleware/task';

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
router.param('projectId', projectExist)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('The task name is mandatory'),
    body('description')
        .notEmpty().withMessage('The description of the task is mandatory'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.param('taskId', taskExist)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('The id is not valid'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('The id is not valid'),
    body('name')
        .notEmpty().withMessage('The task name is mandatory'),
    body('description')
        .notEmpty().withMessage('The description of the task is mandatory'),
    handleInputErrors,
    TaskController.updateTask
)
router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('The id is not valid'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('The id is not valid'),
    body('status')
        .notEmpty().withMessage('The status is mandatory'),
    handleInputErrors,
    TaskController.updateStatus
)

export default router