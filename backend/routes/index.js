const Router = require('express');
const router = new Router();
const authRouter = require('./authRouter');
const eventRouter = require('./eventRouter');

router.use('/auth', authRouter);
router.use('/events', eventRouter);

module.exports = router;