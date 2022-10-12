import { Router } from 'express';
import { body } from 'express-validator';

import authMiddleware from '../middlewares/authMiddleware';

import UserController from '../controllers/UserController';
import EntryController from '../controllers/EntryController';
import TaskController from '../controllers/TaskController';
import { upload } from '../services/ImageService';

const router = Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 32}),
    UserController.register
);
router.post('/login', 
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 32}),
    UserController.login);
router.post('/logout', UserController.logout);
router.get('/confirm/:link', UserController.confirm);
router.get('/refresh', UserController.refresh);

router.get('/entries', authMiddleware, EntryController.getEntries);
router.get('/entries/get/:id', authMiddleware, EntryController.getEntry);
router.post('/entries/add', 
    body('title').isLength({ min: 5}),
    body('content').isLength({ min: 5}),
    authMiddleware,
    EntryController.createEntry);
router.put('/entries/update',
    body('title').isLength({ min: 5}),
    body('content').isLength({ min: 5}),
    authMiddleware, 
    EntryController.updateEntry);
router.delete('/entries/delete/:id', authMiddleware, EntryController.deleteEntry);
router.post('/entries/image', authMiddleware, upload.array('images', 10), EntryController.uploadImage);

router.get('/tasks', authMiddleware, TaskController.getTasks);
router.get('/task/:id', authMiddleware, TaskController.getTask);
router.post('/tasks/add',
    body('title').isLength({ min: 5}),
    authMiddleware, 
    TaskController.createTask);
router.put('/tasks/update',
    body('title').isLength({ min: 5}),
    authMiddleware,
    TaskController.updateTask);
router.delete('/tasks/:id', authMiddleware, TaskController.deleteTask);


export default router;