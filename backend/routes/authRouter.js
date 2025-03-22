const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');

router.post('/login', authController.signIn);
router.post('/signUp', authController.signUp);
router.get('/logout/:id', authController.logout);
router.post('/currentUser', authController.currentUser);
router.post('/checkUsername', authController.isUserNameAvailable);

module.exports = router;