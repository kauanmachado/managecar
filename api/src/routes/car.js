const express = require('express')
const router = express.Router()
const car = require('../controllers/Car/index')
const upload = require('../lib/multer')


router.post('/add', upload.single('img'), car.Add)
router.get('/cars', car.Get)
router.get('/:id', car.GetById)
router.post('/:id', car.Update)
router.delete('/:id', car.Delete)

module.exports = router