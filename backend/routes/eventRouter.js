const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController');

router.post('/get-all', eventController.getAll);
router.get('/:id', eventController.getOne);
router.post('/', eventController.create);
router.post('/edit', eventController.edit);
router.delete('/:id', eventController.delete);

module.exports = router;