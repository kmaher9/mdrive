const router    = require('express').Router()
const uploads   = require('../controllers/upload')

router.get('/', (request, response, next) => {
    return response.status(200).json({
        "message": "API loaded"
    })
})

router.post('/new-file', uploads.newFile)

module.exports = router