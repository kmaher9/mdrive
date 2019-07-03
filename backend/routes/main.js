const router    = require('express').Router()
const uploads   = require('../controllers/upload')
const serve     = require('../controllers/serve')

router.get('/', (request, response, next) => {
    return response.status(200).json({
        "message": "API loaded"
    })
})

router.post('/file', uploads.newFile)
router.get('/files', serve.getFiles)
router.get('/file/:id', serve.getFile)

module.exports = router