import { Router } from 'express';
import { body } from 'express-validator';

import authMiddleware from '../middlewares/authMiddleware';

import UserController from '../controllers/UserController';
import DiaryController from '../controllers/DiaryController';
import TaskController from '../controllers/TaskController';

const router = Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 32}),
    UserController.register
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activationLink);
router.get('/refresh', UserController.refresh);

router.get('/entries', authMiddleware, DiaryController.getEntries);
router.get('/entries/get/:id', authMiddleware, DiaryController.getEntry);
router.post('/entries/add', authMiddleware, DiaryController.createEntry);
router.put('/entries/update', authMiddleware, DiaryController.updateEntry);
router.delete('/entries/delete/:id', authMiddleware, DiaryController.deleteEntry);

router.get('/tasks', authMiddleware, TaskController.getTasks);
router.get('/task/:id', authMiddleware, TaskController.getTask);
router.post('/tasks/add', authMiddleware, TaskController.createTask);
router.put('/tasks/update', authMiddleware, TaskController.updateTask);
router.delete('/tasks/:id', authMiddleware, TaskController.deleteTask);


export default router;