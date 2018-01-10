const router = require('express').Router();

// Middlewares
const authMiddleware = require('./middlewares/auth');

// Controllers
const authController = require('./controllers/authController');
const canvaController = require('./controllers/canvaController');
const userController = require('./controllers/userController');

router.post('/auth/register', authController.register);
router.post('/auth/authenticate', authController.authenticate);
router.post('/auth/forgot_password', authController.forgotPassword);
router.post('/auth/reset_password', authController.resetPassword);

router.use('/canvas', authMiddleware);

router.get('/canvas/from/:id', canvaController.listFromUser);
router.post('/canvas/', canvaController.create);
router.put('/canvas/:id', canvaController.update);
router.delete('/canvas/:id', canvaController.delete);

router.use('/users', authMiddleware);

router.put('/users', userController.update);

module.exports = router;
